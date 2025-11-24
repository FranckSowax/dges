const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// Lazy load heavy dependencies inside handler
// const pdf = require('pdf-parse'); 
// const mammoth = require('mammoth');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openAiKey = process.env.OPENAI_API_KEY;

// Initialisation
if (!supabaseUrl || !supabaseServiceKey || !openAiKey) {
  console.error('Missing environment variables for process-document');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const openai = new OpenAI({ apiKey: openAiKey });

exports.handler = async (event, context) => {
  // Log start to debug 502
  console.log("Function process-document started");

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { record } = JSON.parse(event.body);
    // ... (validation) ...

    console.log(`Processing document ${record.id}: ${record.filename}`);

    // 1. Télécharger le fichier depuis Storage
    const filePath = record.file_path || `knowledge/${record.filename}`; 
    
    console.log(`Downloading file from: ${filePath}`);
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(filePath);

    if (downloadError) throw new Error(`Download error: ${downloadError.message}`);

    // 2. Convertir en Buffer
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`File downloaded, size: ${buffer.length} bytes`);

    // 3. Extraction du texte
    let textContent = "";
    const fileExt = record.filename.split('.').pop().toLowerCase();

    if (fileExt === 'pdf') {
      console.log("Loading pdf-parse...");
      const pdf = require('pdf-parse');
      const pdfData = await pdf(buffer);
      textContent = pdfData.text;
    } else if (fileExt === 'docx' || fileExt === 'doc') {
        console.log("Loading mammoth...");
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ buffer: buffer });
        textContent = result.value;
        if (result.messages && result.messages.length > 0) {
            console.warn("Mammoth messages:", result.messages);
        }
    } else if (['txt', 'md', 'csv'].includes(fileExt)) {
      textContent = buffer.toString('utf-8');
    } else {
      console.warn("Format non supporté, tentative texte brut");
      textContent = buffer.toString('utf-8'); // Try raw
    }
    
    console.log("Text extraction complete.");

    // ... (suite du traitement) ...
    textContent = textContent.replace(/\n+/g, '\n').trim();

    if (textContent.length < 50) {
      throw new Error("Texte extrait trop court ou vide.");
    }

    console.log(`Extracted ${textContent.length} chars.`);

    // 4. Chunking
    const chunks = splitTextIntoChunks(textContent, 1000);
    console.log(`Generated ${chunks.length} chunks.`);

    // 5. Vectorisation et Stockage
    // On supprime d'abord les anciens vecteurs de ce fichier s'ils existent (re-process)
    await supabase.from('knowledge_vectors').delete().eq('source_id', record.id);

    let processedChunks = 0;
    for (const chunk of chunks) {
      // OpenAI Embedding
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.replace(/\n/g, ' '),
      });

      const embedding = embeddingResponse.data[0].embedding;

      // Insert Vector
      const { error: insertError } = await supabase.from('knowledge_vectors').insert({
        source_id: record.id,
        source_type: 'document',
        content: chunk,
        metadata: { filename: record.filename, page: 1 }, // Améliorable avec page number du PDF
        embedding: embedding
      });

      if (insertError) console.error("Vector insert error:", insertError);
      processedChunks++;
    }

    // 6. Mise à jour du statut
    await supabase
      .from('knowledge_sources')
      .update({ status: 'processed' })
      .eq('id', record.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, chunks: processedChunks })
    };

  } catch (error) {
    console.error("Process error:", error);
    
    // Update status to error
    if (event.body) {
      try {
        const { record } = JSON.parse(event.body);
        if (record && record.id) {
          await supabase
            .from('knowledge_sources')
            .update({ status: 'error' }) // On pourrait ajouter une colonne error_message
            .eq('id', record.id);
        }
      } catch (e) {}
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Helper: Split text
function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];
  let currentChunk = "";
  // Split par phrases grossièrement
  const sentences = text.replace(/([.?!])\s+(?=[A-Z])/g, "$1|").split("|");

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}
