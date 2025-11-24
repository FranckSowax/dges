import React, { useState, useEffect } from 'react';
import { User, Plus, Edit2, Trash2, X, Loader } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardResponsables = () => {
  const [responsables, setResponsables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResp, setCurrentResp] = useState(null);

  useEffect(() => {
    fetchResponsables();
  }, []);

  const fetchResponsables = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('responsables').select('*').order('rank', { ascending: true });
    if (error) console.error('Error fetching responsables:', error);
    else setResponsables(data || []);
    setLoading(false);
  };

  const handleAdd = () => {
    setCurrentResp({ name: '', role: '', email: '', rank: responsables.length + 1 });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentResp.id) {
        // Update
        const { error } = await supabase
            .from('responsables')
            .update({ name: currentResp.name, role: currentResp.role, email: currentResp.email })
            .eq('id', currentResp.id);
        if (error) throw error;
        setResponsables(responsables.map(r => r.id === currentResp.id ? currentResp : r));
      } else {
        // Create
        const { data, error } = await supabase
            .from('responsables')
            .insert([{ 
                name: currentResp.name, 
                role: currentResp.role, 
                email: currentResp.email,
                rank: currentResp.rank
            }])
            .select();
        if (error) throw error;
        setResponsables([...responsables, data[0]]);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };
  
  const handleDelete = async (id) => {
      if(confirm('Supprimer ce responsable ?')) {
          const { error } = await supabase.from('responsables').delete().eq('id', id);
          if (!error) setResponsables(responsables.filter(r => r.id !== id));
      }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-gabon-green">
            <User className="w-8 h-8" />
            Gestion des Responsables
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez la liste des responsables de la DGES</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-gabon-green text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        {loading ? (
            <div className="text-center py-10"><Loader className="animate-spin w-8 h-8 mx-auto text-gabon-green"/></div>
        ) : responsables.length === 0 ? (
            <div className="text-center py-10 text-neutral-gray-dark">Aucun responsable trouvé.</div>
        ) : (
            <table className="w-full">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
                <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Email</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
                {responsables.map((resp) => (
                <tr key={resp.id} className="hover:bg-neutral-background/50">
                    <td className="px-6 py-4 font-medium">{resp.name}</td>
                    <td className="px-6 py-4 text-neutral-gray-dark">{resp.role}</td>
                    <td className="px-6 py-4 text-neutral-gray-dark">{resp.email}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => { setCurrentResp(resp); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(resp.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Responsable</h2>
                    <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <input type="text" placeholder="Nom complet" value={currentResp.name} onChange={e => setCurrentResp({...currentResp, name: e.target.value})} className="w-full p-2 border rounded-lg" required />
                    <input type="text" placeholder="Rôle / Poste" value={currentResp.role} onChange={e => setCurrentResp({...currentResp, role: e.target.value})} className="w-full p-2 border rounded-lg" required />
                    <input type="email" placeholder="Email" value={currentResp.email} onChange={e => setCurrentResp({...currentResp, email: e.target.value})} className="w-full p-2 border rounded-lg" />
                    <button type="submit" className="w-full py-2 bg-gabon-green text-white rounded-lg font-bold">Enregistrer</button>
                </form>
            </div>
        </div>
      )}
    </DashboardLayout>
  );
};


export default DashboardResponsables;
