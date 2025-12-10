import React, { useState, useEffect } from 'react';
import { Plus, Search, Newspaper, Trash2, Edit2, Star, X, Save, Loader } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';
import ImageUpload from '../components/Dashboard/ImageUpload';
import GalleryUpload from '../components/Dashboard/GalleryUpload';

const DashboardActualites = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: '',
    gallery_images: [],
    is_featured: false
  });

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (selectedNews) {
      setFormData({
        title: selectedNews.title || '',
        content: selectedNews.content || '',
        image_url: selectedNews.image_url || '',
        video_url: selectedNews.video_url || '',
        gallery_images: selectedNews.gallery_images || [],
        is_featured: selectedNews.is_featured || false
      });
    } else {
      setFormData({
        title: '',
        content: '',
        image_url: '',
        video_url: '',
        gallery_images: [],
        is_featured: false
      });
    }
  }, [selectedNews]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.warn('Supabase fetch error (using mock data):', error.message);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedNews(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette actualité ?')) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setNews(news.filter(n => n.id !== id));
      } catch (error) {
        setNews(news.filter(n => n.id !== id));
      }
    }
  };

  const toggleFeatured = async (item) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ is_featured: !item.is_featured })
        .eq('id', item.id);
        
      if (error) throw error;
      
      setNews(news.map(n => n.id === item.id ? { ...n, is_featured: !n.is_featured } : n));
    } catch (error) {
      // Mock toggle
      setNews(news.map(n => n.id === item.id ? { ...n, is_featured: !n.is_featured } : n));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let result;
      if (selectedNews) {
        const { data, error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', selectedNews.id)
          .select();
        if (error) throw error;
        result = data[0];
        setNews(news.map(n => n.id === result.id ? result : n));
      } else {
        const { data, error } = await supabase
          .from('news')
          .insert([formData])
          .select();
        if (error) throw error;
        result = data[0];
        setNews([result, ...news]);
      }
      setShowForm(false);
      setSelectedNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-gabon-yellow" />
            Gestion des Actualités
          </h1>
          <p className="text-neutral-gray-dark mt-1">Publiez et gérez les articles</p>
        </div>
        <button
          onClick={() => { setSelectedNews(null); setShowForm(true); }}
          className="px-4 py-2 bg-gabon-yellow text-neutral-black rounded-xl font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nouvelle actualité
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder="Rechercher une actualité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-yellow focus:ring-2 focus:ring-gabon-yellow/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-background border-b border-neutral-gray-light">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Titre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-gray-dark">À la une</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-gray-light">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-neutral-gray-dark">Chargement...</td></tr>
            ) : filteredNews.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-neutral-gray-dark">Aucune actualité</td></tr>
            ) : (
              filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-background/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-black">{item.title}</div>
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="w-10 h-10 object-cover rounded mt-1" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-gray-dark">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => toggleFeatured(item)}
                      className={`p-2 rounded-full transition-colors ${item.is_featured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:bg-gray-100'}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-neutral-black">
                {selectedNews ? 'Modifier' : 'Nouvelle'} actualité
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-neutral-gray-light rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Titre</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-yellow focus:ring-2 focus:ring-gabon-yellow/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Date de publication</label>
                <input
                  type="date"
                  required
                  value={formData.published_at}
                  onChange={e => setFormData({...formData, published_at: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-yellow focus:ring-2 focus:ring-gabon-yellow/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Contenu</label>
                <textarea
                  rows="6"
                  required
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-yellow focus:ring-2 focus:ring-gabon-yellow/20 outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <ImageUpload
                  label="Image de couverture"
                  defaultImage={formData.image_url}
                  onUpload={(url) => setFormData({...formData, image_url: url})}
                />
              </div>

              <div>
                <ImageUpload
                  label="Vidéo (Optionnel - MP4, WebM)"
                  defaultImage={formData.video_url}
                  accept="video/*"
                  bucket="videos"
                  onUpload={(url) => setFormData({...formData, video_url: url})}
                />
              </div>

              <div>
                <GalleryUpload
                  images={formData.gallery_images}
                  onUpdate={(images) => setFormData({...formData, gallery_images: images})}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                  className="w-5 h-5 rounded border-neutral-gray-light text-gabon-yellow focus:ring-gabon-yellow"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-neutral-black">
                  Mettre à la une
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-neutral-gray-light">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-neutral-gray-dark hover:bg-neutral-gray-light transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gabon-yellow text-neutral-black hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardActualites;
