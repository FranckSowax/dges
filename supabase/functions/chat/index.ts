import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const openAiKey = Deno.env.get("OPENAI_API_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const configuration = new Configuration({ apiKey: openAiKey });
const openai = new OpenAIApi(configuration);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      throw new Error("No query provided");
    }

    // 1. Generate Embedding for Query
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: query.replace(/\n/g, ' '),
    });
    const queryEmbedding = embeddingResponse.data.data[0].embedding;

    // 2. Search Knowledge Base
    const { data: documents, error: searchError } = await supabase.rpc(
      'match_documents', 
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.5, // Similarity threshold
        match_count: 5        // Top 5 chunks
      }
    );

    if (searchError) throw searchError;

    // 3. Construct Context
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any) => doc.content).join("\n---\n");
    } else {
      contextText = "Aucune information spécifique trouvée dans la base de connaissance.";
    }

    // 4. Chat Completion with Context
    const systemPrompt = `Tu es un assistant IA expert pour la DGES (Direction Générale de l'Enseignement Supérieur) du Gabon.
Ton rôle est d'aider les étudiants et utilisateurs en répondant à leurs questions de manière précise, polie et utile.
Utilise UNIQUEMENT le contexte fourni ci-dessous pour répondre. Si la réponse ne s'y trouve pas, dis honnêtement que tu ne sais pas ou suggère de contacter la DGES directement.
Ne mentionne pas "le contexte fourni" explicitement, réponds naturellement.

Contexte :
${contextText}
`;

    const completionResponse = await openai.createChatCompletion({
      model: "gpt-4o-mini", // or gpt-3.5-turbo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: 0.5,
      stream: false // Set to true for streaming (requires handling in frontend)
    });

    const reply = completionResponse.data.choices[0].message?.content;

    return new Response(JSON.stringify({ answer: reply, sources: documents }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
