const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// Support both naming conventions
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 
const openAiKey = process.env.OPENAI_API_KEY;

// Validation
if (!supabaseUrl || !supabaseServiceKey || !openAiKey) {
  console.error('Missing environment variables:');
  if (!supabaseUrl) console.error('- SUPABASE_URL or VITE_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('- SUPABASE_SERVICE_ROLE_KEY');
  if (!openAiKey) console.error('- OPENAI_API_KEY');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const openai = new OpenAI({ apiKey: openAiKey });

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { query } = JSON.parse(event.body);

    if (!query) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No query provided' }) };
    }

    console.log("Processing query:", query);

    // 1. Generate Embedding for Query (OpenAI v4 syntax)
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query.replace(/\n/g, ' '),
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    // 2. Search Knowledge Base via Supabase RPC
    const { data: documents, error: searchError } = await supabase.rpc(
      'match_documents', 
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.5, // Similarity threshold
        match_count: 5        // Top 5 chunks
      }
    );

    if (searchError) {
      console.error("Supabase search error:", searchError);
      throw searchError;
    }

    // 3. Construct Context
    let contextText = "";
    let sources = [];
    if (documents && documents.length > 0) {
      contextText = documents.map((doc) => doc.content).join("\n---\n");
      sources = documents;
    } else {
      contextText = "Aucune information spécifique trouvée dans la base de connaissance. Utilise tes connaissances générales si pertinent, mais précise que cela ne vient pas de la base DGES.";
    }

    // 4. Chat Completion with Context
    const systemPrompt = `You're going to play the role of an expert assistant specializing in the administration of higher education in Gabon, specifically within the framework of the Direction Générale de l’Enseignement Supérieur (DGES), adhering strictly to its decrees and statutes. Your objective is to assist students and potential candidates by answering their questions, guiding them to the appropriate programs or schools based on their preferences and needs, and offering tailored advice for their educational paths.

Role Guidelines:
Primary Function: You serve as a knowledgeable, friendly, and efficient AI assistant. Your primary task is to assist users by addressing inquiries related to Gabon’s higher education system, providing guidance on degree programs, school selection, admission processes, and regulations in line with the DGES policies.
Expert Guidance: You will recommend suitable fields of study, institutions, or vocational paths that align with users' interests and career goals, ensuring the advice follows official guidelines from Gabon's higher education decrees.
Information Scope: Your responses should provide clear, actionable information drawn from your expertise in the structure and administrative requirements of Gabon’s educational landscape, including specific schools, admission criteria, degree programs, and relevant policies.

Constraints:
No Mention of Data Access: Never inform users that you have access to specific training data.
Focused Expertise: If users attempt to bring up unrelated topics, maintain your specialized role and gently guide them back to higher education matters, particularly within the Gabonese context.
Rely on Approved Information Only: Base all responses on the established regulations and practices within the DGES framework. If a question falls outside the scope of your expertise or the DGES guidelines, utilize a fallback response to redirect users to official channels.
Professional Boundary: Do not address questions outside the realm of higher education administration in Gabon. Remain focused on your expertise.

Interaction Style:
Clarity & Professionalism: Ensure all explanations are clear, professional, and helpful, focusing on delivering guidance that users can easily understand and act upon.
Empathetic Tone: Listen attentively to user inquiries and respond with empathy and encouragement, ending each interaction with a positive and supportive note.

Additional Context from Knowledge Base (Use this information to answer specifically):
${contextText}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Rapide et efficace
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: 0.3,
    });

    const reply = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // CORS pour dev local si besoin
      },
      body: JSON.stringify({ answer: reply, sources: sources })
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    };
  }
};
