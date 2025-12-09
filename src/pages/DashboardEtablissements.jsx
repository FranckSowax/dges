import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, Globe, Bookmark, GraduationCap, School, Landmark } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import EstablishmentForm from '../components/Dashboard/EstablishmentForm';
import { supabase } from '../supabaseClient';

const DashboardEtablissements = () => {
  const location = useLocation();
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  // Determine type based on URL
  const getTypeInfo = () => {
    const path = location.pathname;
    // Sous-catégories des établissements publics (vérifier en premier car plus spécifiques)
    if (path.includes('etablissements-publics/universites')) return { type: 'Université', label: 'Universités', icon: GraduationCap, color: 'text-blue-600' };
    if (path.includes('etablissements-publics/instituts')) return { type: 'Institut', label: 'Instituts', icon: School, color: 'text-indigo-600' };
    if (path.includes('etablissements-publics/grandes-ecoles')) return { type: 'Grande École', label: 'Grandes Écoles', icon: Landmark, color: 'text-amber-600' };
    if (path.includes('etablissements-publics/centres-universitaires')) return { type: 'Centre Universitaire', label: 'Centres Universitaires', icon: Building2, color: 'text-teal-600' };
    // Catégories principales
    if (path.includes('etablissements-publics')) return { type: 'Public', label: 'Établissements Publics', icon: Building2, color: 'text-gabon-blue' };
    if (path.includes('prives')) return { type: 'Privé', label: 'Établissements Privés', icon: Building2, color: 'text-gabon-green' };
    if (path.includes('rup')) return { type: 'RUP', label: 'Établissements RUP', icon: Bookmark, color: 'text-emerald-600' };
    if (path.includes('inter-etat')) return { type: 'Inter-État', label: 'Établissements Inter-État', icon: Globe, color: 'text-purple-600' };
    return { type: 'Public', label: 'Établissements', icon: Building2, color: 'text-neutral-black' };
  };

  const { type, label, icon: Icon, color } = getTypeInfo();

  // Simulated data mapping
  const mockDataMap = {
    'Public': [
      { id: 1, name: 'Institut National des Sciences de Gestion', acronym: 'INSG', type: 'Public', director: 'M. Directeur' },
      { id: 2, name: 'École Normale Supérieure', acronym: 'ENS', type: 'Public', director: 'Mme Directrice' }
    ],
    'Privé': [
      { id: 3, name: 'Institut Privé de Technologie', acronym: 'IPT', type: 'Privé', director: 'Dr. Smith' }
    ],
    'RUP': [
      { id: 4, name: 'Institut du Pétrole et du Gaz', acronym: 'IPG', type: 'RUP', director: 'Ing. Oil' }
    ],
    'Inter-État': [
      { id: 5, name: 'Institut Africain d\'Informatique', acronym: 'IAI', type: 'Inter-État', director: 'Dr. Code' }
    ],
    'Université': [
      { id: 6, name: 'Université Omar Bongo', acronym: 'UOB', type: 'Université', director: 'Pr. Recteur' },
      { id: 7, name: 'Université des Sciences et Techniques de Masuku', acronym: 'USTM', type: 'Université', director: 'Pr. Vice-Recteur' }
    ],
    'Institut': [
      { id: 8, name: 'Institut National des Sciences de Gestion', acronym: 'INSG', type: 'Institut', director: 'M. Directeur' },
      { id: 9, name: 'Institut Universitaire des Sciences de l\'Organisation', acronym: 'IUSO', type: 'Institut', director: 'Dr. Gestionnaire' }
    ],
    'Grande École': [
      { id: 10, name: 'École Normale Supérieure', acronym: 'ENS', type: 'Grande École', director: 'Pr. Directeur' },
      { id: 11, name: 'École Polytechnique de Masuku', acronym: 'EPM', type: 'Grande École', director: 'Ing. Directeur' }
    ],
    'Centre Universitaire': [
      { id: 12, name: 'Centre Universitaire de Port-Gentil', acronym: 'CUPG', type: 'Centre Universitaire', director: 'Dr. Responsable' },
      { id: 13, name: 'Centre Universitaire de Franceville', acronym: 'CUF', type: 'Centre Universitaire', director: 'M. Directeur' }
    ]
  };

  useEffect(() => {
    fetchEstablishments();
  }, [location.pathname]); // Refetch when URL changes

  const fetchEstablishments = async () => {
    setLoading(true);
    setSearchTerm(''); // Reset search
    try {
      const { data, error } = await supabase
        .from('establishments')
        .select('*')
        .eq('type', type)
        .order('name');

      if (error) {
        console.warn('Supabase fetch error (using mock data):', error.message);
        setEstablishments(mockDataMap[type] || []);
      } else if (data && data.length > 0) {
        setEstablishments(data);
      } else {
        setEstablishments(mockDataMap[type] || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setEstablishments(mockDataMap[type] || []);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (est) => {
    setSelectedEstablishment(est);
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
        
        setEstablishments(establishments.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting:', error);
        setEstablishments(establishments.filter(e => e.id !== id));
      }
    }
  };

  const handleSave = (savedEst) => {
    if (selectedEstablishment) {
      setEstablishments(establishments.map(e => e.id === savedEst.id ? savedEst : e));
    } else {
      setEstablishments([...establishments, savedEst]);
    }
    setShowForm(false);
    setSelectedEstablishment(null);
  };

  const filteredEstablishments = establishments.filter(est => 
    est.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.acronym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-2xl font-bold flex items-center gap-3 ${color}`}>
            <Icon className="w-8 h-8" />
            Gestion des {label}
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez la liste des {label.toLowerCase()}</p>
        </div>
        <button
          onClick={() => { setSelectedEstablishment(null); setShowForm(true); }}
          className={`px-4 py-2 text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg opacity-90 hover:opacity-100 ${
            type === 'Privé' ? 'bg-gabon-green' :
            type === 'RUP' ? 'bg-emerald-600' :
            type === 'Inter-État' ? 'bg-purple-600' :
            type === 'Université' ? 'bg-blue-600' :
            type === 'Institut' ? 'bg-indigo-600' :
            type === 'Grande École' ? 'bg-amber-600' :
            type === 'Centre Universitaire' ? 'bg-teal-600' :
            'bg-gabon-blue'
          }`}
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-gray-light mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
          <input
            type="text"
            placeholder={`Rechercher dans ${label}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-blue focus:ring-2 focus:ring-gabon-blue/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-background border-b border-neutral-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark uppercase tracking-wider">Nom</th>
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
              ) : filteredEstablishments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-neutral-gray-dark">
                    Aucun établissement trouvé
                  </td>
                </tr>
              ) : (
                filteredEstablishments.map((est) => (
                  <tr key={est.id} className="hover:bg-neutral-background/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-black">{est.name}</div>
                      {est.description && (
                        <div className="text-sm text-neutral-gray-dark truncate max-w-xs">{est.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        type === 'Privé' ? 'bg-green-100 text-green-700' :
                        type === 'RUP' ? 'bg-emerald-100 text-emerald-700' :
                        type === 'Inter-État' ? 'bg-purple-100 text-purple-700' :
                        type === 'Université' ? 'bg-blue-100 text-blue-700' :
                        type === 'Institut' ? 'bg-indigo-100 text-indigo-700' :
                        type === 'Grande École' ? 'bg-amber-100 text-amber-700' :
                        type === 'Centre Universitaire' ? 'bg-teal-100 text-teal-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {est.acronym}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-black">
                      {est.director || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(est)}
                          className="p-2 text-gabon-blue hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(est.id)}
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
          establishment={selectedEstablishment}
          type={type}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardEtablissements;
