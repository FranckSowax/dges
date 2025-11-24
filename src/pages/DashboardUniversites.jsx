import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, GraduationCap } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import EstablishmentForm from '../components/Dashboard/EstablishmentForm';
import { supabase } from '../supabaseClient';

const DashboardUniversites = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedUni, setSelectedUni] = useState(null);

  // Simulated data for now (Fallback if Supabase is empty or not connected properly)
  const initialData = [
    {
      id: 1,
      name: "Université Omar Bongo",
      acronym: "UOB",
      type: "Université",
      description: "La première université du Gabon...",
      director: "Jean-Jacques Ekomie",
      city: "Libreville"
    },
    {
      id: 2,
      name: "Université des Sciences et Techniques de Masuku",
      acronym: "USTM",
      type: "Université",
      description: "Pôle d'excellence technologique...",
      director: "Crépin Ella Missang",
      city: "Franceville"
    }
  ];

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('establishments')
        .select('*')
        .eq('type', 'Université')
        .order('name');

      if (error) {
        console.warn('Supabase fetch error (using mock data):', error.message);
        setUniversities(initialData);
      } else if (data && data.length > 0) {
        setUniversities(data);
      } else {
        setUniversities(initialData);
      }
    } catch (error) {
      console.error('Error:', error);
      setUniversities(initialData);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (uni) => {
    setSelectedUni(uni);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
      try {
        const { error } = await supabase
          .from('establishments')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        setUniversities(universities.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error deleting:', error);
        // For mock data simulation
        setUniversities(universities.filter(u => u.id !== id));
      }
    }
  };

  const handleSave = (savedUni) => {
    if (selectedUni) {
      setUniversities(universities.map(u => u.id === savedUni.id ? savedUni : u));
    } else {
      setUniversities([...universities, savedUni]);
    }
    setShowForm(false);
    setSelectedUni(null);
  };

  const filteredUniversities = universities.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.acronym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-gabon-green" />
            Gestion des Universités
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez la liste des universités publiques</p>
        </div>
        <button
          onClick={() => { setSelectedUni(null); setShowForm(true); }}
          className="px-4 py-2 bg-gabon-green text-white rounded-xl font-medium hover:bg-gabon-green-dark transition-colors flex items-center gap-2 shadow-lg shadow-gabon-green/20"
        >
          <Plus className="w-5 h-5" />
          Ajouter une université
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder="Rechercher une université par nom ou acronyme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark uppercase tracking-wider">Établissement</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark uppercase tracking-wider">Acronyme</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark uppercase tracking-wider">Directeur</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-neutral-gray-dark">
                    Chargement...
                  </td>
                </tr>
              ) : filteredUniversities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-neutral-gray-dark">
                    Aucune université trouvée
                  </td>
                </tr>
              ) : (
                filteredUniversities.map((uni) => (
                  <tr key={uni.id} className="hover:bg-neutral-background/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-black">{uni.name}</div>
                      <div className="text-sm text-neutral-gray-dark truncate max-w-xs">{uni.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {uni.acronym}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-black">
                      {uni.director || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(uni)}
                          className="p-2 text-gabon-blue hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(uni.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
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
      </div>

      {showForm && (
        <EstablishmentForm
          establishment={selectedUni}
          type="Université"
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardUniversites;
