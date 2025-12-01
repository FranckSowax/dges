import React, { useState, useEffect } from 'react';
import { Upload, FileText, Database, Loader, Trash2, CheckCircle, AlertCircle, RefreshCw, Sparkles, HardDrive, Clock, Zap } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardKnowledge = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [storeInfo, setStoreInfo] = useState(null);
  const [storeLoading, setStoreLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
    fetchStoreInfo();
  }, []);

  // Récupérer les infos du Gemini File Search Store
  const fetchStoreInfo = async () => {
    setStoreLoading(true);
    try {
      const response = await fetch('/.netlify/functions/gemini-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'store-info' })
      });
      const data = await response.json();
      setStoreInfo(data);
    } catch (error) {
      console.error('Error fetching store info:', error);
      setStoreInfo({ configured: false, error: error.message });
    } finally {
      setStoreLoading(false);
    }
  };

  const fetchFiles = async () => {
    setLoading(true);
    try {
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

  // Types de fichiers supportés par Gemini File Search
  const supportedTypes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const supportedExtensions = '.pdf,.txt,.md,.csv,.doc,.docx,.xlsx';

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification du type
    if (!supportedTypes.includes(file.type)) {
      alert('Type de fichier non supporté. Formats acceptés: PDF, TXT, MD, CSV, DOC, DOCX, XLSX');
      return;
    }

    // Vérification de la taille (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Fichier trop volumineux. Taille maximale: 100 MB');
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      // 1. Upload vers Supabase Storage (backup)
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Upload vers Gemini File Search Store
      const response = await fetch('/.netlify/functions/gemini-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'upload',
          fileName: fileName,
          fileUrl: fileName
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'upload vers Gemini');
      }

      if (result.status === 'processing') {
        alert('Fichier envoyé ! Le traitement par Gemini peut prendre quelques minutes.');
      } else {
        alert('Succès ! Le fichier a été indexé dans la base de connaissance Gemini.');
      }
      
      fetchFiles();
      fetchStoreInfo();

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce document de la base de connaissance ?')) return;
    
    try {
      const response = await fetch('/.netlify/functions/gemini-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', documentId: id })
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      setFiles(files.filter(f => f.id !== id));
      fetchStoreInfo();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Formater la taille en bytes
  const formatBytes = (bytes) => {
    if (!bytes || bytes === '0') return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Base de Connaissance Gemini RAG
          </h1>
          <p className="text-neutral-gray-dark mt-1">
            Alimentez le chatbot avec vos documents via Google Gemini File Search
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => { fetchFiles(); fetchStoreInfo(); }}
            className="px-4 py-3 rounded-xl font-medium text-neutral-gray-dark bg-white border border-neutral-gray-light hover:bg-neutral-background transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Actualiser
          </button>
          
          <label className={`px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer transition-colors shadow-lg ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}`}>
            {uploading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            <span>{uploading ? 'Traitement...' : 'Uploader un fichier'}</span>
            <input 
              type="file" 
              className="hidden" 
              accept={supportedExtensions}
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Gemini Store Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-black">Gemini File Search Store</h3>
              {storeLoading ? (
                <p className="text-sm text-neutral-gray-dark">Chargement...</p>
              ) : storeInfo?.configured ? (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Connecté et opérationnel
                </p>
              ) : (
                <p className="text-sm text-orange-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Non configuré
                </p>
              )}
            </div>
          </div>
          
          {storeInfo?.configured && storeInfo?.store && (
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{storeInfo.store.activeDocuments || 0}</p>
                <p className="text-xs text-neutral-gray-dark">Documents actifs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{storeInfo.store.pendingDocuments || 0}</p>
                <p className="text-xs text-neutral-gray-dark">En traitement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-black">{formatBytes(storeInfo.store.sizeBytes)}</p>
                <p className="text-xs text-neutral-gray-dark">Taille totale</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-gray-dark">Documents Locaux</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-black">{files.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-gray-dark">Dans Gemini</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {storeInfo?.store?.activeDocuments || 0}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-gray-dark">Dernière MAJ</h3>
          </div>
          <p className="text-lg font-bold text-green-600">
            {files.length > 0 ? new Date(files[0].created_at).toLocaleDateString() : '-'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-neutral-gray-light shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-gray-dark">Modèle IA</h3>
          </div>
          <p className="text-lg font-bold text-yellow-600">Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Supported Formats Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Formats supportés:</strong> PDF, TXT, Markdown, CSV, DOC, DOCX, XLSX • 
          <strong> Taille max:</strong> 100 MB par fichier
        </p>
      </div>

      {/* File List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center">
          <h2 className="font-bold text-lg">Documents Sources</h2>
          <span className="text-sm text-neutral-gray-dark">{files.length} fichier(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Fichier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date d'ajout</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center">
                  <Loader className="w-6 h-6 animate-spin mx-auto text-purple-600" />
                </td></tr>
              ) : files.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-black">Aucun document</p>
                      <p className="text-sm text-neutral-gray-dark">Uploadez un fichier pour alimenter la base de connaissance</p>
                    </div>
                  </div>
                </td></tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-background/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-neutral-black">{file.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        {file.category || 'Gemini RAG'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" /> Indexé
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
