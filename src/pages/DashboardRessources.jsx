import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Trash2, Eye, Upload, Download, Edit, Scale, Gavel, ScrollText, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardRessources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Loi',
    reference: '',
    description: '',
    publication_date: '',
    file: null,
    file_url: '',
    file_name: '',
    file_type: ''
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('legal_resources')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.warn('Supabase fetch error:', error.message);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return { url: null, name: null, type: null };
    
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `ressources/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    return {
      url: data.publicUrl,
      name: file.name,
      type: fileExt
    };
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') return '📄';
    if (['doc', 'docx'].includes(fileType)) return '📝';
    return '📁';
  };

  const canPreviewInBrowser = (fileType) => {
    return fileType === 'pdf';
  };

  const handlePreview = (resource) => {
    if (resource.file_url) {
      setPreviewDoc(resource);
    } else {
      alert('Aucun fichier disponible pour cette ressource.');
    }
  };

  const handleDownload = (resource) => {
    if (resource.file_url) {
      const link = document.createElement('a');
      link.href = resource.file_url;
      link.download = resource.file_name || `${resource.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Aucun fichier disponible pour cette ressource.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let fileData = { url: formData.file_url, name: formData.file_name, type: formData.file_type };

      if (formData.file) {
        fileData = await handleFileUpload(formData.file);
      }

      const resourceData = {
        title: formData.title,
        category: formData.category,
        reference: formData.reference,
        description: formData.description,
        publication_date: formData.publication_date || null,
        file_url: fileData.url || formData.file_url,
        file_name: fileData.name || formData.file_name,
        file_type: fileData.type || formData.file_type,
        file_size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : null
      };

      if (editingId) {
        const { data, error } = await supabase
          .from('legal_resources')
          .update(resourceData)
          .eq('id', editingId)
          .select();

        if (error) throw error;
        setResources(resources.map(r => r.id === editingId ? data[0] : r));
      } else {
        const { data, error } = await supabase
          .from('legal_resources')
          .insert([resourceData])
          .select();

        if (error) throw error;
        setResources([data[0], ...resources]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (resource) => {
    setFormData({
      title: resource.title,
      category: resource.category,
      reference: resource.reference || '',
      description: resource.description || '',
      publication_date: resource.publication_date || '',
      file: null,
      file_url: resource.file_url || '',
      file_name: resource.file_name || '',
      file_type: resource.file_type || ''
    });
    setEditingId(resource.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Loi',
      reference: '',
      description: '',
      publication_date: '',
      file: null,
      file_url: '',
      file_name: '',
      file_type: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette ressource ?')) {
      try {
        const { error } = await supabase.from('legal_resources').delete().eq('id', id);
        if (error) throw error;
        setResources(resources.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Loi': return 'bg-blue-100 text-blue-700';
      case 'Décret': return 'bg-emerald-100 text-emerald-700';
      case 'Arrêté': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Loi': return Scale;
      case 'Décret': return Gavel;
      case 'Arrêté': return ScrollText;
      default: return FileText;
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Loi': return 'from-blue-600 to-blue-700';
      case 'Décret': return 'from-emerald-600 to-emerald-700';
      case 'Arrêté': return 'from-amber-600 to-amber-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <Scale className="w-8 h-8 text-gabon-green" />
            Ressources Juridiques
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez les lois, décrets et arrêtés</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gabon-green text-white rounded-xl font-medium hover:bg-gabon-green-dark transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvelle ressource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Lois', count: resources.filter(r => r.category === 'Loi').length, color: 'blue', icon: Scale },
          { label: 'Décrets', count: resources.filter(r => r.category === 'Décret').length, color: 'emerald', icon: Gavel },
          { label: 'Arrêtés', count: resources.filter(r => r.category === 'Arrêté').length, color: 'amber', icon: ScrollText }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-neutral-gray-light flex items-center gap-4">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</div>
              <div className="text-sm text-neutral-gray-dark">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder="Rechercher par titre, référence ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-neutral-gray-dark">Chargement...</div>
        ) : filteredResources.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center">
            <FileText className="w-16 h-16 text-neutral-gray-light mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-black mb-2">Aucune ressource</h3>
            <p className="text-neutral-gray-dark">Ajoutez votre première ressource juridique</p>
          </div>
        ) : (
          filteredResources.map((resource) => {
            const IconComponent = getCategoryIcon(resource.category);
            return (
              <div key={resource.id} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Card Header */}
                <div className={`p-5 bg-gradient-to-br ${getCategoryGradient(resource.category)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                      {resource.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white line-clamp-2 text-sm">
                    {resource.reference || resource.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2">
                  <p className="text-sm text-neutral-gray-dark line-clamp-2">
                    {resource.description || resource.title}
                  </p>
                  {resource.publication_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gabon-green" />
                      <span className="text-neutral-gray-dark">{new Date(resource.publication_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  {resource.file_size && (
                    <div className="text-xs text-neutral-gray-dark">📄 {resource.file_size}</div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="px-5 py-3 bg-neutral-background border-t border-neutral-gray-light flex justify-between">
                  <div className="flex gap-2">
                    {resource.file_url && (
                      <>
                        <button 
                          onClick={() => handlePreview(resource)}
                          className="p-2 text-gabon-green hover:bg-green-50 rounded-lg transition-colors"
                          title="Aperçu"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownload(resource)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Télécharger"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleEdit(resource)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDelete(resource.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 my-8">
            <h2 className="text-xl font-bold mb-6">
              {editingId ? 'Modifier la ressource' : 'Nouvelle ressource juridique'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Loi fixant les règles applicables..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie *</label>
                  <select
                    className="w-full p-3 border rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Loi">Loi</option>
                    <option value="Décret">Décret</option>
                    <option value="Arrêté">Arrêté</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date de publication</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.publication_date}
                    onChange={e => setFormData({...formData, publication_date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Référence</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                  value={formData.reference}
                  onChange={e => setFormData({...formData, reference: e.target.value})}
                  placeholder="Ex: Loi n° 21.84 du 29.12.1984"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-3 border rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Description du texte juridique..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Document (PDF)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full p-3 border rounded-xl"
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                />
                {formData.file_url && !formData.file && (
                  <p className="text-xs text-green-600 mt-1">✓ Un fichier est déjà associé ({formData.file_name || 'document'})</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-neutral-gray-dark hover:bg-neutral-gray-light rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-gabon-green text-white rounded-lg hover:bg-gabon-green-dark disabled:opacity-50"
                >
                  {uploading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-4 border-b bg-gradient-to-r ${getCategoryGradient(previewDoc.category)} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{getFileIcon(previewDoc.file_type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">{previewDoc.reference || previewDoc.title}</h3>
                    <p className="text-sm text-white/70">
                      {previewDoc.file_name || 'Document'} • {previewDoc.file_size || 'Taille inconnue'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(previewDoc)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </button>
                  <a
                    href={previewDoc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 bg-neutral-gray-light overflow-hidden">
                {canPreviewInBrowser(previewDoc.file_type) ? (
                  <iframe
                    src={`${previewDoc.file_url}#toolbar=1&navpanes=0`}
                    className="w-full h-full border-0"
                    title={previewDoc.title}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
                      <span className="text-5xl">{getFileIcon(previewDoc.file_type)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-black mb-2">
                      Aperçu non disponible
                    </h3>
                    <p className="text-neutral-gray-dark mb-6 max-w-md">
                      Les fichiers {previewDoc.file_type?.toUpperCase() || 'de ce type'} ne peuvent pas être prévisualisés directement dans le navigateur.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(previewDoc)}
                        className="px-6 py-3 bg-gabon-green text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-gabon-green-dark transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger le document
                      </button>
                      <a
                        href={previewDoc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-neutral-black text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-neutral-gray-dark transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                        Ouvrir avec une app
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DashboardRessources;
