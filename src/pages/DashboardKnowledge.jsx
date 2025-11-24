import React, { useState, useEffect } from 'react';
import { Upload, FileText, Database, Loader, Trash2, RefreshCw, CheckCircle, AlertCircle, Building2, Plus, X, FileType } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardKnowledge = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [syncingEst, setSyncingEst] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textContent, setTextContent] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      // Mock data if table doesn't exist yet
      setFiles([
        { id: 1, filename: "Guide_Etudiant_2024.pdf", status: "processed", created_at: new Date().toISOString() },
        { id: 2, filename: "Liste_Bourses.xlsx", status: "pending", created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textContent.title || !textContent.body) return;
    
    setUploading(true);
    try {
      // Créer un fichier virtuel .txt
      const fileName = `${textContent.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.txt`;
      const filePath = `knowledge/${fileName}`;
      const fileBody = new Blob([textContent.body], { type: 'text/plain' });
      
      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, fileBody);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(filePath);

      // 2. Create record in DB
      const { data, error: dbError } = await supabase
        .from('knowledge_sources')
        .insert([{
          filename: fileName,
          file_url: urlData.publicUrl,
          file_type: 'txt',
          status: 'pending'
        }])
        .select();

      if (dbError) throw dbError;
      
      const newRecord = data[0];
      setFiles([newRecord, ...files]);
      
      // 3. Trigger Processing
      triggerProcessing(newRecord, filePath);
      
      setShowTextModal(false);
      setTextContent({ title: '', body: '' });
      alert('Texte ajouté et en cours de traitement !');

    } catch (error) {
      console.error('Text upload error:', error);
      alert('Erreur lors de l\'ajout du texte');
    } finally {
      setUploading(false);
    }
  };

  const handleSyncEstablishments = async () => {
    setSyncingEst(true);
    try {
        const response = await fetch('/.netlify/functions/sync-establishments', { method: 'POST' });
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.error || 'Erreur de synchro');
        
        alert(`Synchronisation réussie ! ${result.count} établissements indexés.`);
        fetchFiles(); // Refresh list to see the DATABASE source
    } catch (error) {
        console.error('Sync error:', error);
        alert('Erreur lors de la synchronisation des établissements');
    } finally {
        setSyncingEst(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Upload to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${file.name}`;
      const filePath = `knowledge/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents') // Using existing documents bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(filePath);

      // 2. Create record in DB
      const { data, error: dbError } = await supabase
        .from('knowledge_sources')
        .insert([{
          filename: file.name,
          file_url: urlData.publicUrl,
          file_type: fileExt,
          status: 'pending'
        }])
        .select();

      if (dbError) throw dbError;
      
      const newRecord = data[0];
      setFiles([newRecord, ...files]);
      
      // 3. Trigger Processing (Netlify Function)
      // On passe le filePath du storage pour que le backend puisse le télécharger
      triggerProcessing(newRecord, filePath);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const triggerProcessing = async (record, storagePath) => {
    try {
      // On met à jour l'UI localement pour montrer que ça travaille
      setFiles(prev => prev.map(f => f.id === record.id ? { ...f, status: 'pending' } : f));

      const response = await fetch('/.netlify/functions/process-document-background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          record: {
            ...record,
            file_path: storagePath
          }
        })
      });

      // Pour une background function, on reçoit 202 Accepted immédiatement
      if (response.status === 202) {
        alert('Document envoyé pour traitement en arrière-plan. Le statut se mettra à jour automatiquement dans quelques instants.');
        // On laisse le polling ou le refresh manuel faire le reste, 
        // ou on garde le statut 'pending' localement
        return; 
      }

      // Si ce n'est pas 202, c'est peut-être une erreur directe
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Erreur lors de l\'envoi du traitement');
      }

    } catch (error) {
      console.error('Processing error:', error);
      alert('Erreur: ' + error.message);
      setFiles(prev => prev.map(f => f.id === record.id ? { ...f, status: 'error' } : f));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce document et ses données vectorisées ?')) return;
    
    try {
      const { error } = await supabase.from('knowledge_sources').delete().eq('id', id);
      if (error) throw error;
      setFiles(files.filter(f => f.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      setFiles(files.filter(f => f.id !== id)); // Optimistic update for demo
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
            Gérez les documents sources pour l'entrainement du Chatbot
          </p>
        </div>
        <div className="flex gap-3">
            <button
                onClick={handleSyncEstablishments}
                disabled={syncingEst}
                className="px-4 py-2 bg-white text-gabon-blue border border-gabon-blue rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
                {syncingEst ? <Loader className="w-5 h-5 animate-spin" /> : <Building2 className="w-5 h-5" />}
                <span>Sync. Établissements</span>
            </button>

            <button
                onClick={() => setShowTextModal(true)}
                className="px-4 py-2 bg-white text-gabon-green border border-gabon-green rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center gap-2 shadow-sm"
            >
                <FileType className="w-5 h-5" />
                <span>Coller texte</span>
            </button>

            <label className="px-4 py-2 bg-gabon-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg cursor-pointer">
                {uploading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                <span>Ajouter un document</span>
                <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.md"
                    onChange={handleUpload}
                    disabled={uploading}
                />
            </label>
        </div>
      </div>

      {/* ... Stats ... */}

      {showTextModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-black">Ajouter du texte brut</h2>
              <button onClick={() => setShowTextModal(false)} className="p-2 hover:bg-neutral-gray-light rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleTextSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Titre / Sujet</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Procédure d'inscription 2024"
                  value={textContent.title}
                  onChange={e => setTextContent({...textContent, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Contenu</label>
                <textarea
                  required
                  rows="10"
                  placeholder="Collez votre texte ici..."
                  value={textContent.body}
                  onChange={e => setTextContent({...textContent, body: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none transition-all font-mono text-sm"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowTextModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-neutral-gray-dark hover:bg-neutral-gray-light transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gabon-blue text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Ajouter à la base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats / Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">Documents Indexés</h3>
            <p className="text-3xl font-bold text-neutral-black">{files.filter(f => f.status === 'processed').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">En attente de traitement</h3>
            <p className="text-3xl font-bold text-gabon-yellow">{files.filter(f => f.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
            <h3 className="text-sm font-medium text-neutral-gray-dark mb-2">Total Connaissances</h3>
            <p className="text-3xl font-bold text-gabon-green">~{files.length * 15} chunks</p>
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="p-6 border-b border-neutral-gray-light">
            <h2 className="font-bold text-lg">Fichiers Sources</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Fichier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date d'ajout</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center">Chargement...</td></tr>
              ) : files.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-neutral-gray-dark">Aucun document dans la base de connaissance</td></tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-background/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-neutral-gray-dark" />
                          <span className="font-medium text-neutral-black">{file.filename}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 uppercase text-xs font-bold text-neutral-gray-dark">
                      {file.file_type || file.filename.split('.').pop()}
                    </td>
                    <td className="px-6 py-4">
                      {file.status === 'processed' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3" /> Indexé
                          </span>
                      )}
                      {file.status === 'pending' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              <RefreshCw className="w-3 h-3 animate-spin" /> En traitement
                          </span>
                      )}
                      {file.status === 'error' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <AlertCircle className="w-3 h-3" /> Erreur
                          </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-gray-dark">
                      {new Date(file.created_at).toLocaleDateString()}
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
