const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const pdf = require('pdf-parse');

// Configuration pour augmenter le timeout (le traitement PDF peut être long)
exports.config = {
  path: "/api/ingest", // URL personnalisée optionnelle
  type: "experimental-background" // Permet de tourner jusqu'à 15min (nécessite plan Pro) ou standard (10s)
};

exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' } };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { fileName, fileUrl } = JSON.parse(event.body);
    console.log(`📥 Début ingestion pour : ${fileName}`);

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY // Ou SERVICE_ROLE_KEY si RLS restrictif
    );
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 1. Télécharger le fichier depuis Supabase Storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('documents')
      .download(fileName);

    if (downloadError) throw new Error(`Erreur téléchargement: ${downloadError.message}`);

    // Convertir le Blob/ArrayBuffer en Buffer pour pdf-parse
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extraire le texte du PDF
    const pdfData = await pdf(buffer);
    const text = pdfData.text;
    console.log(`📄 Texte extrait : ${text.length} caractères`);

    // 3. Découpage (Chunking)
    const chunks = splitText(text);
    console.log(`✂️ ${chunks.length} sections générées`);

    // 4. Créer l'entrée document dans la BDD
    const { data: docEntry, error: docError } = await supabase
      .from('documents')
      .insert({
        title: fileName,
        url: fileUrl || fileName,
        category: 'Upload Admin'
      })
      .select()
      .single();

    if (docError) throw docError;

    // 5. Générer embeddings et sauvegarder
    for (const chunk of chunks) {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });
      const embedding = embeddingResponse.data[0].embedding;

      await supabase.from('document_sections').insert({
        document_id: docEntry.id,
        content: chunk,
        embedding: embedding,
        token_count: chunk.length / 4
      });
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, chunks: chunks.length, id: docEntry.id })
    };

  } catch (error) {
    console.error('❌ Erreur Ingestion:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Fonction utilitaire de découpage (identique au script local)
function splitText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = start + chunkSize;
    let chunk = text.slice(start, end);
    const lastPeriod = chunk.lastIndexOf('.');
    if (lastPeriod > chunkSize * 0.5) {
       chunk = chunk.slice(0, lastPeriod + 1);
       start += lastPeriod + 1 - overlap;
    } else {
       start += chunkSize - overlap;
    }
    chunks.push(chunk.trim());
  }
  return chunks.filter(c => c.length > 50);
}
