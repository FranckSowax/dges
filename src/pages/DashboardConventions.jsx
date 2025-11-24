import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Trash2, Eye, Upload, Download } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardConventions = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Convention', // Convention, Accord Université, Accord Institut
    file: null,
    file_url: ''
  });

  // Mock data fallback
  const mockDocs = [
    { id: 1, title: "Convention Cadre UOB-France", category: "Convention", size: "2.5 MB", date: "2024-03-15" },
    { id: 2, title: "Accord Mobilité Étudiante", category: "Accord Université", size: "1.2 MB", date: "2024-02-10" }
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.warn('Supabase fetch error (using mock data):', error.message);
      setDocuments(mockDocs);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `conventions/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let fileUrl = formData.file_url;

      if (formData.file) {
        fileUrl = await handleFileUpload(formData.file);
      }

      const docData = {
        title: formData.title,
        category: formData.category,
        url: fileUrl,
        size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : '0 MB',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('documents')
        .insert([docData])
        .select();

      if (error) throw error;

      setDocuments([data[0], ...documents]);
      setShowForm(false);
      setFormData({ title: '', category: 'Convention', file: null, file_url: '' });
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce document ?')) {
      try {
        const { error } = await supabase.from('documents').delete().eq('id', id);
        if (error) throw error;
        setDocuments(documents.filter(d => d.id !== id));
      } catch (error) {
        console.error('Error deleting:', error);
        setDocuments(documents.filter(d => d.id !== id));
      }
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <FileText className="w-8 h-8 text-gabon-blue" />
            Gestion des Conventions
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez les documents de coopération</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gabon-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Upload className="w-5 h-5" />
          Ajouter un document
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder="Rechercher une convention..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-background border-b border-neutral-gray-light">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Document</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Catégorie</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-gray-light">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-neutral-gray-dark">Chargement...</td></tr>
            ) : filteredDocs.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-neutral-gray-dark">Aucun document</td></tr>
            ) : (
              filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-background/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-black">{doc.title}</div>
                        <div className="text-xs text-neutral-gray-dark">{doc.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-neutral-gray-light rounded-full text-sm font-medium text-neutral-gray-dark">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-black">
                    {doc.date || new Date(doc.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gabon-blue hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-6">Ajouter un document</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-xl"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Convention">Convention</option>
                  <option value="Accord Université">Accord Université</option>
                  <option value="Accord Institut">Accord Institut</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fichier (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full p-3 border rounded-xl"
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-neutral-gray-dark hover:bg-neutral-gray-light rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-gabon-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Envoi...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardConventions;
