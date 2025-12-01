const { GoogleGenAI } = require('@google/genai');
const { createClient } = require('@supabase/supabase-js');

// Environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;
const fileSearchStoreName = process.env.GEMINI_FILE_SEARCH_STORE_NAME;
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Initialize clients
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Initialize Supabase only if we have valid credentials
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { action, fileName, fileUrl, documentId } = JSON.parse(event.body);

    // Validate API key
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Action: Create File Search Store (one-time setup)
    if (action === 'create-store') {
      const store = await ai.fileSearchStores.create({
        config: { displayName: 'DGES-Gabon-Knowledge-Base' }
      });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          storeName: store.name,
          message: 'File Search Store créé avec succès. Sauvegardez ce nom dans GEMINI_FILE_SEARCH_STORE_NAME'
        })
      };
    }

    // Action: List all stores
    if (action === 'list-stores') {
      const stores = [];
      for await (const store of ai.fileSearchStores.list()) {
        stores.push({
          name: store.name,
          displayName: store.displayName,
          activeDocuments: store.activeDocumentsCount,
          pendingDocuments: store.pendingDocumentsCount,
          sizeBytes: store.sizeBytes
        });
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, stores })
      };
    }

    // Action: Upload file to File Search Store
    if (action === 'upload') {
      if (!fileName || !fileUrl) {
        throw new Error('fileName and fileUrl are required');
      }

      if (!fileSearchStoreName) {
        throw new Error('GEMINI_FILE_SEARCH_STORE_NAME not configured. Create a store first.');
      }

      // Download file from Supabase Storage
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('documents')
        .download(fileName);

      if (downloadError) {
        throw new Error(`Failed to download file: ${downloadError.message}`);
      }

      // Convert to buffer
      const buffer = Buffer.from(await fileData.arrayBuffer());

      // Determine MIME type
      const extension = fileName.split('.').pop().toLowerCase();
      const mimeTypes = {
        'pdf': 'application/pdf',
        'txt': 'text/plain',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'csv': 'text/csv',
        'md': 'text/markdown'
      };
      const mimeType = mimeTypes[extension] || 'application/octet-stream';

      // Upload to Gemini File Search Store
      let operation = await ai.fileSearchStores.uploadToFileSearchStore({
        fileSearchStoreName: fileSearchStoreName,
        file: {
          data: buffer,
          mimeType: mimeType
        },
        config: {
          displayName: fileName,
          chunkingConfig: {
            whiteSpaceConfig: {
              maxTokensPerChunk: 500,
              maxOverlapTokens: 50
            }
          }
        }
      });

      // Poll for completion (max 60 seconds)
      let attempts = 0;
      while (!operation.done && attempts < 12) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.get({ operation });
        attempts++;
      }

      if (!operation.done) {
        // Still processing, but we'll return success
        return {
          statusCode: 202,
          headers,
          body: JSON.stringify({
            success: true,
            status: 'processing',
            message: 'Fichier en cours de traitement par Gemini. Cela peut prendre quelques minutes.'
          })
        };
      }

      if (operation.error) {
        throw new Error(`Gemini processing error: ${operation.error.message}`);
      }

      // Save document reference to Supabase for tracking
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title: fileName,
          category: 'Gemini RAG',
          file_url: fileUrl,
          gemini_document_name: operation.response?.name || null
        });

      if (dbError) {
        console.warn('Failed to save document reference:', dbError);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          status: 'completed',
          message: 'Fichier uploadé et indexé avec succès dans Gemini File Search'
        })
      };
    }

    // Action: Delete document from store
    if (action === 'delete' && documentId) {
      // Note: Gemini doesn't have a direct document delete API yet
      // We'll just remove from our tracking table
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Document supprimé' })
      };
    }

    // Action: Get store info
    if (action === 'store-info') {
      if (!fileSearchStoreName) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: false, 
            configured: false,
            message: 'Aucun File Search Store configuré' 
          })
        };
      }

      const store = await ai.fileSearchStores.get({ name: fileSearchStoreName });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          configured: true,
          store: {
            name: store.name,
            displayName: store.displayName,
            activeDocuments: store.activeDocumentsCount || 0,
            pendingDocuments: store.pendingDocumentsCount || 0,
            failedDocuments: store.failedDocumentsCount || 0,
            sizeBytes: store.sizeBytes || 0
          }
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action' })
    };

  } catch (error) {
    console.error('Gemini upload error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    };
  }
};
