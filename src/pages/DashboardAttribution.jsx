import React, { useState, useEffect } from 'react';
import { Building2, Save, Loader } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardAttribution = () => {
  const [content, setContent] = useState({
    missions: '',
    organisation: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('dges_content').select('*');
    
    if (error) {
        console.error('Error fetching content:', error);
    } else if (data) {
        const newContent = { missions: '', organisation: '' };
        data.forEach(item => {
            if (item.key === 'missions') newContent.missions = item.content;
            if (item.key === 'organisation') newContent.organisation = item.content;
        });
        setContent(newContent);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
        // Upsert missions
        const { error: err1 } = await supabase.from('dges_content')
            .upsert({ key: 'missions', content: content.missions }, { onConflict: 'key' });
        
        // Upsert organisation
        const { error: err2 } = await supabase.from('dges_content')
            .upsert({ key: 'organisation', content: content.organisation }, { onConflict: 'key' });

        if (err1 || err2) throw new Error('Erreur de sauvegarde');
        
        alert("Modifications enregistrées !");
    } catch (error) {
        console.error('Save error:', error);
        alert("Erreur lors de la sauvegarde");
    } finally {
        setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-purple-600">
            <Building2 className="w-8 h-8" />
            Attribution & Organisation
          </h1>
          <p className="text-neutral-gray-dark mt-1">Éditez les textes de présentation de la DGES</p>
        </div>
        <button 
            onClick={handleSave} 
            disabled={saving || loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </div>

      {loading ? (
          <div className="text-center py-20"><Loader className="w-10 h-10 animate-spin mx-auto text-purple-600"/></div>
      ) : (
        <div className="grid gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
                <h2 className="text-lg font-bold mb-4">Missions</h2>
                <textarea 
                    className="w-full h-60 p-4 border border-neutral-gray-light rounded-xl focus:ring-2 focus:ring-purple-200 outline-none"
                    value={content.missions}
                    onChange={(e) => setContent({...content, missions: e.target.value})}
                    placeholder="Décrivez les missions de la DGES..."
                />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
                <h2 className="text-lg font-bold mb-4">Organisation</h2>
                <textarea 
                    className="w-full h-60 p-4 border border-neutral-gray-light rounded-xl focus:ring-2 focus:ring-purple-200 outline-none"
                    value={content.organisation}
                    onChange={(e) => setContent({...content, organisation: e.target.value})}
                    placeholder="Décrivez l'organisation de la DGES..."
                />
            </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardAttribution;

