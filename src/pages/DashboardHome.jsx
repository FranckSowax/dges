import React, { useState, useEffect } from 'react';
import { Save, Loader, LayoutTemplate, Video, Image as ImageIcon } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import MediaUpload from '../components/Dashboard/ImageUpload';
import { supabase } from '../supabaseClient';

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    section_key: 'hero_main',
    media_type: 'video',
    media_url: '',
    title: '',
    subtitle: '',
    cta_text: 'En savoir plus',
    cta_link: '/universites'
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_config')
        .select('*')
        .eq('section_key', 'hero_main')
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows found

      if (data) {
        setConfig(data);
      } else {
        // Default config if none exists
        setConfig({
            section_key: 'hero_main',
            media_type: 'video',
            media_url: 'https://res.cloudinary.com/dln7mhq4z/video/upload/v1732114938/v4_ou0bi6.mp4',
            title: "Portail Numérique de l'Enseignement Supérieur",
            subtitle: "Direction Générale de l'Enseignement Supérieur",
            cta_text: 'En savoir plus',
            cta_link: '/universites'
        });
      }
    } catch (error) {
      console.error('Error fetching home config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('homepage_config')
        .upsert(config, { onConflict: 'section_key' });

      if (error) throw error;
      alert('Configuration sauvegardée avec succès !');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleMediaUpload = (url, type) => {
    setConfig(prev => ({
      ...prev,
      media_url: url,
      media_type: type || 'image' // fallback
    }));
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 text-gabon-green animate-spin" />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-gabon-green" />
            Page d'Accueil
          </h1>
          <p className="text-neutral-gray-dark mt-1">Personnalisez le contenu principal du site</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light space-y-6">
            <h2 className="text-lg font-bold text-neutral-black mb-4 border-b pb-2">Section Principale (Héro)</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Média Principal (Vidéo ou Image)</label>
              <MediaUpload 
                label=""
                bucket="homepage"
                accept="image/*,video/*"
                defaultUrl={config.media_url}
                onUpload={handleMediaUpload}
              />
              <p className="text-xs text-neutral-gray-dark mt-2">
                Format recommandé : Vidéo MP4 (max 50MB) ou Image JPG/PNG haute résolution (1920x1080).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Titre Principal</label>
                    <input
                        type="text"
                        value={config.title}
                        onChange={e => setConfig({...config, title: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Sous-titre</label>
                    <input
                        type="text"
                        value={config.subtitle}
                        onChange={e => setConfig({...config, subtitle: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gabon-green text-white hover:bg-gabon-green-dark transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Enregistrer les modifications
                </button>
            </div>
          </form>
        </div>

        {/* Preview / Info */}
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">Aperçu en direct</h3>
                <p className="text-sm text-blue-600 mb-4">
                    Les modifications sont appliquées instantanément sur la page d'accueil après sauvegarde.
                </p>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <div className="aspect-video bg-neutral-200 rounded overflow-hidden relative">
                        {config.media_type === 'video' ? (
                            <video src={config.media_url} className="w-full h-full object-cover" muted autoPlay loop />
                        ) : (
                            <img src={config.media_url} className="w-full h-full object-cover" alt="Aperçu" />
                        )}
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-2">
                            <h4 className="font-bold text-xs md:text-sm mb-1">{config.title}</h4>
                            <p className="text-[10px]">{config.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
