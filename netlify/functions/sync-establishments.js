const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openAiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseServiceKey || !openAiKey) {
  console.error('Missing environment variables for sync-establishments');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const openai = new OpenAI({ apiKey: openAiKey });

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    console.log("Starting establishment sync...");

    // 1. Get or Create a 'Database Source' in knowledge_sources
    // This acts as a container for all database-derived vectors
    let sourceId;
    const { data: existingSource } = await supabase
      .from('knowledge_sources')
      .select('id')
      .eq('filename', 'DATABASE_ESTABLISHMENTS')
      .single();

    if (existingSource) {
      sourceId = existingSource.id;
    } else {
      const { data: newSource, error: sourceError } = await supabase
        .from('knowledge_sources')
        .insert({
            filename: 'DATABASE_ESTABLISHMENTS',
            file_url: 'database://establishments',
            file_type: 'database',
            status: 'processed'
        })
        .select()
        .single();
      
      if (sourceError) throw sourceError;
      sourceId = newSource.id;
    }

    // 2. Fetch all establishments
    const { data: establishments, error: fetchError } = await supabase
      .from('establishments')
      .select('*');

    if (fetchError) throw fetchError;
    console.log(`Found ${establishments.length} establishments to sync.`);

    // 3. Clear old vectors for this source
    await supabase
        .from('knowledge_vectors')
        .delete()
        .eq('source_id', sourceId);

    // 4. Vectorize and Insert
    let processedCount = 0;
    
    // Process in batches to avoid timeouts
    for (const est of establishments) {
        // Construct rich text representation
        const content = `
Nom: ${est.name}
Acronyme: ${est.acronym || 'N/A'}
Type: Établissement ${est.type}
Directeur/Responsable: ${est.director || 'Non spécifié'}
Description: ${est.description || 'Aucune description disponible.'}
Contact: ${est.contact || 'N/A'}
Site Web: ${est.website || 'N/A'}
Ville/Localisation: ${est.location || 'Gabon'}

Ceci est un établissement d'enseignement supérieur officiel reconnu par la DGES.
        `.trim();

        // Generate Embedding
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: content.replace(/\n/g, ' '),
        });
        const embedding = embeddingResponse.data[0].embedding;

        // Insert Vector
        await supabase.from('knowledge_vectors').insert({
            source_id: sourceId,
            source_type: 'establishment', // Custom type
            content: content,
            metadata: { 
                establishment_id: est.id, 
                name: est.name,
                type: est.type 
            },
            embedding: embedding
        });

        processedCount++;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        count: processedCount, 
        message: `Synced ${processedCount} establishments` 
      })
    };

  } catch (error) {
    console.error("Sync error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
