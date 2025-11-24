import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0";

// Configuration
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const openAiKey = Deno.env.get("OPENAI_API_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const configuration = new Configuration({ apiKey: openAiKey });
const openai = new OpenAIApi(configuration);

serve(async (req) => {
  try {
    // 1. Parse Webhook Payload
    const { record } = await req.json();
    if (!record || !record.id || !record.file_url) {
      return new Response("Invalid record", { status: 400 });
    }

    console.log(`Processing document ${record.id}: ${record.filename}`);

    // 2. Download File
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(record.filename); // Assumes filename is path, or adjust logic

    if (downloadError) throw new Error(`Download error: ${downloadError.message}`);

    // 3. Extract Text (Simplified for Edge)
    let textContent = "";
    const fileType = record.file_type?.toLowerCase();

    if (fileType === 'txt' || fileType === 'md') {
      textContent = await fileData.text();
    } else {
      // TODO: For PDF/DOCX, in a real production Edge Function, 
      // you might use an external OCR API (like Tesseract or Cloud Vision) 
      // or a dedicated heavy extraction service because Deno Edge has limits.
      // For now, we act as if we extracted text or assume it's text-readable.
      console.warn("Complex file type extraction requires external service or specialized Deno lib.");
      textContent = "Contenu extrait simulé pour " + record.filename; 
      // In prod: call an external API like unstructured.io or use pdf-lib if pure JS
    }

    // 4. Chunk Text
    const chunks = splitTextIntoChunks(textContent, 1000);
    console.log(`Generated ${chunks.length} chunks`);

    // 5. Generate Embeddings & Store
    for (const chunk of chunks) {
      // OpenAI Embedding
      const embeddingResponse = await openai.createEmbedding({
        model: "text-embedding-3-small",
        input: chunk,
      });

      const embedding = embeddingResponse.data.data[0].embedding;

      // Insert Vector
      await supabase.from('knowledge_vectors').insert({
        source_id: record.id,
        source_type: 'document',
        content: chunk,
        metadata: { filename: record.filename },
        embedding: embedding
      });
    }

    // 6. Update Status
    await supabase
      .from('knowledge_sources')
      .update({ status: 'processed' })
      .eq('id', record.id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing document:", error);
    
    // Mark as error in DB
    if (req.record?.id) {
        await supabase
        .from('knowledge_sources')
        .update({ status: 'error' })
        .eq('id', req.record.id);
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Helper: Split text into chunks
function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks = [];
  let currentChunk = "";
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
