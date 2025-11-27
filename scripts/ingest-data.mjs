import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse/lib/pdf-parse.js';

// Chargement manuel du .env car dotenv n'est pas installé par défaut
const loadEnv = async () => {
  try {
    const envContent = await fs.readFile(path.resolve(process.cwd(), '.env'), 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, ''); // Enlever les quotes
      }
    });
  } catch (e) {
    console.warn('⚠️ Impossible de lire le fichier .env, assurez-vous que les variables sont définies.');
  }
};

await loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Idéalement utiliser SERVICE_ROLE_KEY pour l'écriture, mais ANON peut marcher si RLS le permet
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey || !openaiApiKey) {
  console.error('❌ Variables d\'environnement manquantes (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, OPENAI_API_KEY).');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiApiKey });

async function processPdf(filePath) {
  console.log(`📄 Traitement de : ${path.basename(filePath)}`);
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

function splitText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = start + chunkSize;
    let chunk = text.slice(start, end);
    // Essayer de couper à la fin d'une phrase pour être plus propre
    const lastPeriod = chunk.lastIndexOf('.');
    if (lastPeriod > chunkSize * 0.5) {
       chunk = chunk.slice(0, lastPeriod + 1);
       start += lastPeriod + 1 - overlap;
    } else {
       start += chunkSize - overlap;
    }
    chunks.push(chunk.trim());
  }
  return chunks.filter(c => c.length > 50); // Ignorer les chunks trop courts
}

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  return response.data[0].embedding;
}

async function main() {
  const docsDir = path.resolve(process.cwd(), 'documents');
  
  try {
    const files = await fs.readdir(docsDir);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      console.log('⚠️ Aucun fichier PDF trouvé dans le dossier "documents".');
      return;
    }

    for (const file of pdfFiles) {
      const filePath = path.join(docsDir, file);
      const content = await processPdf(filePath);
      const chunks = splitText(content);

      console.log(`✂️ ${chunks.length} sections générées pour ${file}`);

      // Créer l'entrée document parent
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert({
          title: file,
          url: file, // Pour l'instant le nom du fichier local
          category: 'General'
        })
        .select()
        .single();

      if (docError) {
        console.error(`❌ Erreur création document ${file}:`, docError);
        continue;
      }

      console.log(`💾 Document créé avec ID: ${docData.id}. Génération des embeddings...`);

      // Traiter les chunks
      for (const [i, chunk] of chunks.entries()) {
        try {
          const embedding = await generateEmbedding(chunk);
          
          await supabase.from('document_sections').insert({
            document_id: docData.id,
            content: chunk,
            embedding: embedding,
            token_count: chunk.length / 4 // estimation grossière
          });
          
          process.stdout.write('.'); // Barre de progression minimaliste
        } catch (err) {
          console.error(`\n❌ Erreur sur le chunk ${i}:`, err.message);
        }
      }
      console.log(`\n✅ Import terminé pour ${file}\n`);
    }
  } catch (err) {
    console.error('Erreur principale:', err);
  }
}

main();
