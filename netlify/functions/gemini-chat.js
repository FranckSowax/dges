const { GoogleGenAI } = require('@google/genai');

// Environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;
const fileSearchStoreName = process.env.GEMINI_FILE_SEARCH_STORE_NAME;

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// System prompt for DGES assistant
const SYSTEM_PROMPT = `Tu es un assistant expert spécialisé dans l'administration de l'enseignement supérieur au Gabon, spécifiquement dans le cadre de la Direction Générale de l'Enseignement Supérieur (DGES). Tu respectes strictement ses décrets et statuts.

Ton objectif est d'aider les étudiants et candidats potentiels en répondant à leurs questions, en les guidant vers les programmes ou écoles appropriés selon leurs préférences et besoins, et en offrant des conseils personnalisés pour leurs parcours éducatifs.

Directives de rôle:
- Fonction principale: Tu es un assistant IA compétent, amical et efficace. Ta tâche principale est d'aider les utilisateurs en répondant aux questions relatives au système d'enseignement supérieur du Gabon.
- Expertise: Tu recommandes des domaines d'études, institutions ou parcours professionnels adaptés aux intérêts et objectifs de carrière des utilisateurs.
- Portée: Tes réponses fournissent des informations claires et exploitables sur la structure et les exigences administratives du paysage éducatif gabonais.

Contraintes:
- Ne mentionne jamais que tu as accès à des données d'entraînement spécifiques.
- Si les utilisateurs abordent des sujets non liés, ramène-les doucement aux questions d'enseignement supérieur.
- Base toutes tes réponses sur les réglementations et pratiques établies dans le cadre de la DGES.
- Ne réponds pas aux questions en dehors du domaine de l'administration de l'enseignement supérieur au Gabon.

Style d'interaction:
- Clarté et professionnalisme: Assure-toi que toutes les explications sont claires, professionnelles et utiles.
- Ton empathique: Écoute attentivement les demandes des utilisateurs et réponds avec empathie et encouragement.
- Réponds TOUJOURS en français.`;

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
    const { query, conversationHistory = [] } = JSON.parse(event.body);

    if (!query) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: 'No query provided' }) 
      };
    }

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log('Processing query with Gemini RAG:', query);

    // Build conversation contents
    const contents = [];
    
    // Add conversation history if exists
    if (conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      }
    }

    // Add current user query
    contents.push({
      role: 'user',
      parts: [{ text: query }]
    });

    // Configure tools - use File Search if store is configured
    const tools = [];
    if (fileSearchStoreName) {
      tools.push({
        fileSearch: {
          fileSearchStoreNames: [fileSearchStoreName]
        }
      });
    }

    // Generate response with Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      contents: contents,
      config: {
        tools: tools.length > 0 ? tools : undefined,
        temperature: 0.3,
        maxOutputTokens: 2048
      }
    });

    // Extract response text
    const answer = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je n\'ai pas pu générer une réponse.';

    // Extract citations/grounding metadata if available
    let sources = [];
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    if (groundingMetadata?.groundingChunks) {
      sources = groundingMetadata.groundingChunks.map((chunk, index) => ({
        id: index,
        title: chunk.retrievedContext?.title || 'Document',
        content: chunk.retrievedContext?.text || ''
      }));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer,
        sources,
        model: 'gemini-2.5-flash',
        ragEnabled: !!fileSearchStoreName
      })
    };

  } catch (error) {
    console.error('Gemini chat error:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message || 'Internal Server Error';
    if (error.message?.includes('API_KEY')) {
      errorMessage = 'Clé API Gemini non configurée ou invalide';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'Quota API Gemini dépassé';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};
