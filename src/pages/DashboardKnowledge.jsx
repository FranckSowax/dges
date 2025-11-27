import React, { useState, useEffect } from 'react';
import { Upload, FileText, Database, Loader, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardKnowledge = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      // On récupère la liste des documents stockés dans la table 'documents'
      // que notre fonction d'ingestion remplit
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification extension
    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés pour le moment.');
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      // 1. Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Déclencher l'ingestion (Fonction Netlify)
      const response = await fetch('/.netlify/functions/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fileName: fileName,
          fileUrl: fileName // On stocke le chemin relatif pour l'instant
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'ingestion');
      }

      alert(`Succès ! ${result.chunks} sections de texte ont été indexées.`);
      fetchFiles(); // Rafraîchir la liste

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = null; // Reset input
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce document et toutes ses connaissances associées ?')) return;
    
    try {
      const { error } = await supabase.from('documents').delete().eq('id', id);
      if (error) throw error;
      setFiles(files.filter(f => f.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <Database className="w-8 h-8 text-gabon-blue" />
            Base de Connaissance IA
          </h1>
          <p className="text-neutral-gray-dark mt-1">
            Ajoutez des PDF pour enrichir les connaissances du Chatbot
          </p>
        </div>
        
        <label className={`px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer transition-colors shadow-lg ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gabon-green hover:bg-gabon-green-dark'}`}>
          {uploading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          <span>{uploading ? 'Traitement...' : 'Uploader un PDF'}</span>
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">Documents Indexés</h3>
            <p className="text-3xl font-bold text-neutral-black">{files.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">Dernière mise à jour</h3>
            <p className="text-lg font-bold text-gabon-blue">
              {files.length > 0 ? new Date(files[0].created_at).toLocaleDateString() : '-'}
            </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">Statut du Système</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-gabon-green">Opérationnel</span>
            </div>
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="p-6 border-b border-neutral-gray-light">
            <h2 className="font-bold text-lg">Documents Sources</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Fichier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date d'ajout</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center">Chargement...</td></tr>
              ) : files.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-neutral-gray-dark">Aucun document pour le moment. Uploadez un PDF pour commencer.</td></tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-background/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gabon-blue" />
                          <span className="font-medium text-neutral-black">{file.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {file.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-gray-dark">
                      {new Date(file.created_at).toLocaleDateString()} à {new Date(file.created_at).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                          onClick={() => handleDelete(file.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                      >
                          <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardKnowledge;
