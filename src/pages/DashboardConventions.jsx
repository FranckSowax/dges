import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Trash2, Eye, Upload, Download, Edit, Globe, Calendar } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardConventions = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Convention',
    description: '',
    partner_country: '',
    partner_institution: '',
    signing_date: '',
    file: null,
    file_url: ''
  });

  // Mock data fallback
  const mockAgreements = [
    { id: 1, title: "Convention de collaboration entre l'Université de Dschang et l'USTM", category: "Convention", partner_country: "Cameroun", partner_institution: "Université de Dschang", signing_date: "2024-03-15", file_size: "2.5 MB" },
    { id: 2, title: "Accord de coopération UOB - Université de Ngaoundéré", category: "Accord Université", partner_country: "Cameroun", partner_institution: "Université de Ngaoundéré", signing_date: "2023-06-10", file_size: "1.8 MB" },
    { id: 3, title: "Accord-cadre ENSET - Université Cheikh Anta Diop", category: "Accord Institut", partner_country: "Sénégal", partner_institution: "UCAD Dakar", signing_date: "2023-09-20", file_size: "2.1 MB" }
  ];

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cooperation_agreements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgreements(data && data.length > 0 ? data : mockAgreements);
    } catch (error) {
      console.warn('Supabase fetch error (using mock data):', error.message);
      setAgreements(mockAgreements);
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

      const agreementData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        partner_country: formData.partner_country,
        partner_institution: formData.partner_institution,
        signing_date: formData.signing_date || null,
        file_url: fileUrl,
        file_size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : null
      };

      if (editingId) {
        const { data, error } = await supabase
          .from('cooperation_agreements')
          .update(agreementData)
          .eq('id', editingId)
          .select();

        if (error) throw error;
        setAgreements(agreements.map(a => a.id === editingId ? data[0] : a));
      } else {
        const { data, error } = await supabase
          .from('cooperation_agreements')
          .insert([agreementData])
          .select();

        if (error) throw error;
        setAgreements([data[0], ...agreements]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (agreement) => {
    setFormData({
      title: agreement.title,
      category: agreement.category,
      description: agreement.description || '',
      partner_country: agreement.partner_country || '',
      partner_institution: agreement.partner_institution || '',
      signing_date: agreement.signing_date || '',
      file: null,
      file_url: agreement.file_url || ''
    });
    setEditingId(agreement.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Convention',
      description: '',
      partner_country: '',
      partner_institution: '',
      signing_date: '',
      file: null,
      file_url: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet accord ?')) {
      try {
        const { error } = await supabase.from('cooperation_agreements').delete().eq('id', id);
        if (error) throw error;
        setAgreements(agreements.filter(a => a.id !== id));
      } catch (error) {
        console.error('Error deleting:', error);
        setAgreements(agreements.filter(a => a.id !== id));
      }
    }
  };

  const filteredAgreements = agreements.filter(agreement => 
    agreement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agreement.partner_country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agreement.partner_institution?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Convention': return 'bg-blue-100 text-blue-700';
      case 'Accord Université': return 'bg-green-100 text-green-700';
      case 'Accord Institut': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <Globe className="w-8 h-8 text-gabon-blue" />
            Coopération Internationale
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez les accords et conventions de coopération</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gabon-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvel accord
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Conventions', count: agreements.filter(a => a.category === 'Convention').length, color: 'blue' },
          { label: 'Accords Universités', count: agreements.filter(a => a.category === 'Accord Université').length, color: 'green' },
          { label: 'Accords Instituts', count: agreements.filter(a => a.category === 'Accord Institut').length, color: 'purple' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white p-4 rounded-xl border border-neutral-gray-light`}>
            <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</div>
            <div className="text-sm text-neutral-gray-dark">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder="Rechercher par titre, pays ou institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-neutral-gray-dark">Chargement...</div>
        ) : filteredAgreements.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center">
            <FileText className="w-16 h-16 text-neutral-gray-light mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-black mb-2">Aucun accord</h3>
            <p className="text-neutral-gray-dark">Ajoutez votre premier accord de coopération</p>
          </div>
        ) : (
          filteredAgreements.map((agreement) => (
            <div key={agreement.id} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-lg transition-shadow group">
              {/* Card Header */}
              <div className="p-5 border-b border-neutral-gray-light">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gabon-blue to-gabon-blue-dark rounded-xl flex items-center justify-center text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(agreement.category)}`}>
                    {agreement.category}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-black line-clamp-2 mb-2">{agreement.title}</h3>
                {agreement.description && (
                  <p className="text-sm text-neutral-gray-dark line-clamp-2">{agreement.description}</p>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2">
                {agreement.partner_institution && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gabon-blue" />
                    <span className="text-neutral-gray-dark">{agreement.partner_institution}</span>
                  </div>
                )}
                {agreement.partner_country && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-gray-dark">🌍 {agreement.partner_country}</span>
                  </div>
                )}
                {agreement.signing_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gabon-blue" />
                    <span className="text-neutral-gray-dark">{new Date(agreement.signing_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                {agreement.file_size && (
                  <div className="text-xs text-neutral-gray-dark">📄 {agreement.file_size}</div>
                )}
              </div>

              {/* Card Actions */}
              <div className="px-5 py-3 bg-neutral-background border-t border-neutral-gray-light flex justify-between">
                <div className="flex gap-2">
                  {agreement.file_url && (
                    <a 
                      href={agreement.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gabon-blue hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                  <button 
                    onClick={() => handleEdit(agreement)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => handleDelete(agreement.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 my-8">
            <h2 className="text-xl font-bold mb-6">
              {editingId ? 'Modifier l\'accord' : 'Nouvel accord de coopération'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Convention de coopération UOB - Université de Paris"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie *</label>
                <select
                  className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Convention">Convention</option>
                  <option value="Accord Université">Accord Université</option>
                  <option value="Accord Institut">Accord Institut</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Description de l'accord..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pays partenaire</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                    value={formData.partner_country}
                    onChange={e => setFormData({...formData, partner_country: e.target.value})}
                    placeholder="Ex: France"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date de signature</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                    value={formData.signing_date}
                    onChange={e => setFormData({...formData, signing_date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Institution partenaire</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none"
                  value={formData.partner_institution}
                  onChange={e => setFormData({...formData, partner_institution: e.target.value})}
                  placeholder="Ex: Université de Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Document PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full p-3 border rounded-xl"
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                />
                {formData.file_url && !formData.file && (
                  <p className="text-xs text-green-600 mt-1">✓ Un fichier est déjà associé</p>
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
                  className="px-4 py-2 bg-gabon-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
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
