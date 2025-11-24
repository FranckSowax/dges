import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Lock, Save, X, MapPin, Phone, Mail, 
  Globe, Edit2, Trash2, FileText, Upload, GraduationCap,
  Building2, School, Linkedin
} from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const AnnuaireUniversites = () => {
  const [universities, setUniversities] = useState([
    {
      id: 1,
      type: 'Université',
      name: 'Université Omar Bongo',
      acronym: 'UOB',
      rectorName: 'Pr Jean Jacques EKOMIE',
      rectorTitle: 'Recteur',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@uob.ga',
      website: 'https://www.uob.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 2,
      type: 'Université',
      name: 'Université des Sciences de la Santé',
      acronym: 'USS',
      rectorName: 'Pr Jean Bruno BOGUIKOUMA',
      rectorTitle: 'Recteur',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@uss.ga',
      website: 'https://www.uss.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 3,
      type: 'Université',
      name: 'Université des Sciences et Techniques de MASUKU',
      acronym: 'USTM',
      rectorName: 'Pr Raphaël BIKANGA',
      rectorTitle: 'Recteur',
      address: 'Franceville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@ustm.ga',
      website: 'https://www.ustm.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 4,
      type: 'Université',
      name: 'Université des Sciences et des Techniques de la Santé',
      acronym: 'USTS',
      rectorName: 'Médecin Général Jérôme MILOUNDJA',
      rectorTitle: 'Recteur',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@usts.ga',
      website: 'https://www.usts.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 5,
      type: 'Université',
      name: 'Université Numérique du Gabon',
      acronym: 'UNG',
      rectorName: 'François Jacques MAVOUNGOU',
      rectorTitle: 'Coordonnateur Général',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@ung.ga',
      website: 'https://www.ung.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 6,
      type: 'Institut',
      name: 'Institut National des Sciences de Gestion',
      acronym: 'INSG',
      rectorName: 'Natacha Murielle MBOUNA',
      rectorTitle: 'Directeur Général',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@insg.ga',
      website: 'https://www.insg.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 7,
      type: 'École',
      name: 'Ecole Normale Supérieure',
      acronym: 'ENS',
      rectorName: '',
      rectorTitle: '',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@ens.ga',
      website: 'https://www.ens.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 8,
      type: 'École',
      name: "Ecole Normale Supérieure de l'Enseignement Technique",
      acronym: 'ENSET',
      rectorName: 'Richard Guy KIBOUKA',
      rectorTitle: 'Directeur Général',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@enset.ga',
      website: 'https://www.enset.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 9,
      type: 'Institut',
      name: 'Institut Supérieur de Technologie',
      acronym: 'IST',
      rectorName: 'Jean Paul MAMBOUNDOU',
      rectorTitle: 'Directeur Général',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@ist.ga',
      website: 'https://www.ist.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 10,
      type: 'Institut',
      name: "Institut Universitaire des Sciences de l'Organisation",
      acronym: 'IUSO',
      rectorName: 'Aristide MENDAME EDZEGUE',
      rectorTitle: 'Directeur Général',
      address: 'Libreville, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@iuso.ga',
      website: 'https://www.iuso.ga',
      logo: null,
      rectorPhoto: null
    },
    {
      id: 11,
      type: 'Institut',
      name: "Institut de Technologies d'Owendo",
      acronym: 'ITO',
      rectorName: "Serge LANCHAIS M'BOUMBA",
      rectorTitle: 'Directeur Général',
      address: 'Owendo, Gabon',
      phone: '+241 XX XX XX XX',
      email: 'contact@ito.ga',
      website: 'https://www.ito.ga',
      logo: null,
      rectorPhoto: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.rectorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || uni.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: universities.length,
    universites: universities.filter(u => u.type === 'Université').length,
    instituts: universities.filter(u => u.type === 'Institut').length,
    ecoles: universities.filter(u => u.type === 'École').length
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({});
    setShowModal(true);
  };

  const openEditModal = (uni) => {
    setEditingId(uni.id);
    setFormData(uni);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setUniversities(universities.map(u => u.id === editingId ? { ...u, ...formData } : u));
    } else {
      setUniversities([...universities, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
      setUniversities(universities.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-gabon-green via-gabon-blue to-gabon-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Annuaire des Universités</h1>
            <p className="text-lg lg:text-xl opacity-95">Direction Générale de l'Enseignement Supérieur</p>
          </motion.div>
        </div>
      </section>

      {/* Admin Bar */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white shadow-lg sticky top-[88px] z-40 overflow-hidden"
          >
            <div className="container-custom py-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3 text-gabon-yellow font-semibold">
                  <Lock className="w-5 h-5" />
                  Mode Administration
                </div>
                <div className="flex gap-3">
                  <button onClick={() => alert('Enregistré!')} className="btn-primary bg-gabon-green text-white">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                  <button onClick={() => setIsAdminMode(false)} className="btn-secondary">
                    <X className="w-4 h-4" />
                    Quitter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: GraduationCap, label: 'Établissements', value: stats.total, color: 'from-gabon-green to-gabon-green-dark' },
              { icon: Building2, label: 'Universités', value: stats.universites, color: 'from-gabon-blue to-gabon-blue-dark' },
              { icon: School, label: 'Instituts', value: stats.instituts, color: 'from-gabon-yellow to-yellow-600' },
              { icon: FileText, label: 'Écoles', value: stats.ecoles, color: 'from-gabon-green to-gabon-blue' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gabon-green mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-gray-dark font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un établissement..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all bg-white"
                >
                  <option value="all">Tous les types</option>
                  <option value="Université">Universités</option>
                  <option value="Institut">Instituts</option>
                  <option value="École">Écoles</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsAdminMode(!isAdminMode)} className="btn-secondary">
                  <Lock className="w-4 h-4" />
                  Admin
                </button>
                <button onClick={openAddModal} className="btn-primary bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white">
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* University Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((uni, idx) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-neutral-background to-gabon-green-light p-6 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gabon-green via-gabon-blue to-gabon-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white text-xs font-bold rounded-full uppercase mb-4">
                    {uni.type}
                  </span>
                  
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white relative overflow-hidden">
                    {uni.logo ? (
                      <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-gabon-green opacity-30">
                        {uni.acronym.substring(0, 2)}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-neutral-black mb-2 line-clamp-2">{uni.name}</h3>
                  <p className="text-sm font-semibold text-neutral-gray-dark">{uni.acronym}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {uni.rectorName && (
                    <div className="mb-5 text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-3 border-neutral-gray-light">
                        {uni.rectorPhoto ? (
                          <img src={uni.rectorPhoto} alt={uni.rectorName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gabon-green-light to-gabon-blue-light flex items-center justify-center text-2xl text-gabon-green opacity-50">
                            👤
                          </div>
                        )}
                      </div>
                      <p className="font-semibold text-neutral-black mb-1">{uni.rectorName}</p>
                      <p className="text-sm text-gabon-green font-medium">{uni.rectorTitle}</p>
                    </div>
                  )}

                  <div className="space-y-3 pt-5 border-t border-neutral-gray-light">
                    {uni.address && (
                      <div className="flex items-center gap-3 text-sm text-neutral-gray-dark">
                        <MapPin className="w-4 h-4 text-gabon-green flex-shrink-0" />
                        <span>{uni.address}</span>
                      </div>
                    )}
                    {uni.phone && (
                      <div className="flex items-center gap-3 text-sm text-neutral-gray-dark">
                        <Phone className="w-4 h-4 text-gabon-green flex-shrink-0" />
                        <span>{uni.phone}</span>
                      </div>
                    )}
                    {uni.email && (
                      <div className="flex items-center gap-3 text-sm text-neutral-gray-dark">
                        <Mail className="w-4 h-4 text-gabon-green flex-shrink-0" />
                        <span className="truncate">{uni.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button onClick={() => window.open(uni.website, '_blank')} className="btn-secondary flex-1 text-sm">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </button>
                    <button className="btn-primary bg-gabon-green text-white flex-1 text-sm">
                      <FileText className="w-4 h-4" />
                      Détails
                    </button>
                  </div>

                  {isAdminMode && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-neutral-gray-light">
                      <button onClick={() => openEditModal(uni)} className="btn-secondary flex-1 text-sm">
                        <Edit2 className="w-4 h-4" />
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(uni.id)} className="btn-secondary flex-1 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <h3 className="text-2xl font-bold text-neutral-black mb-2">Aucun résultat</h3>
              <p className="text-neutral-gray-dark">Aucun établissement ne correspond à votre recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold">{editingId ? 'Modifier' : 'Ajouter'} un établissement</h2>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full hover:bg-neutral-background transition-colors flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Type d'établissement</label>
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="Université">Université</option>
                    <option value="Institut">Institut</option>
                    <option value="École">École</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    placeholder="Université Omar Bongo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Acronyme</label>
                  <input
                    type="text"
                    value={formData.acronym || ''}
                    onChange={(e) => setFormData({ ...formData, acronym: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    placeholder="UOB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Nom du Recteur/Directeur</label>
                  <input
                    type="text"
                    value={formData.rectorName || ''}
                    onChange={(e) => setFormData({ ...formData, rectorName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    placeholder="Pr Jean Jacques EKOMIE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Titre</label>
                  <input
                    type="text"
                    value={formData.rectorTitle || ''}
                    onChange={(e) => setFormData({ ...formData, rectorTitle: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    placeholder="Recteur"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                      placeholder="+241 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                      placeholder="contact@universite.ga"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Site web</label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    placeholder="https://www.universite.ga"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-neutral-gray-light flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="btn-secondary">
                  Annuler
                </button>
                <button onClick={handleSave} className="btn-primary bg-gabon-green text-white">
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AnnuaireUniversites;
