import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Phone, Mail, Globe, GraduationCap,
  Building2, School, Landmark, X, ExternalLink, Loader, Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import { supabase } from '../supabaseClient';

const EtablissementsPublics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('universites');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [etablissementsData, setEtablissementsData] = useState({
    universites: [],
    instituts: [],
    grandesEcoles: [],
    centresUniversitaires: []
  });

  // Données de fallback (mock) si Supabase est vide
  const mockData = {
    universites: [
      { id: 1, name: 'Université Omar Bongo', acronym: 'UOB', director: 'Pr Jean Jacques EKOMIE', director_title: 'Recteur', address: 'Libreville, Gabon', phone: '+241 01 73 20 54', email: 'contact@uob.ga', website_url: 'https://www.uob.ga', description: 'Première université du Gabon, fondée en 1970.', logo_url: null },
      { id: 2, name: 'Université des Sciences de la Santé', acronym: 'USS', director: 'Pr Jean Bruno BOGUIKOUMA', director_title: 'Recteur', address: 'Libreville, Gabon', phone: '+241 01 76 00 00', email: 'contact@uss.ga', website_url: 'https://www.uss.ga', description: 'Université spécialisée dans la formation des professionnels de santé.', logo_url: null },
      { id: 3, name: 'Université des Sciences et Techniques de Masuku', acronym: 'USTM', director: 'Pr Raphaël BIKANGA', director_title: 'Recteur', address: 'Franceville, Haut-Ogooué', phone: '+241 01 67 74 34', email: 'contact@ustm.ga', website_url: 'https://www.ustm.ga', description: 'Pôle d\'excellence en sciences et technologies.', logo_url: null },
      { id: 4, name: 'Université des Sciences et des Techniques de la Santé', acronym: 'USTS', director: 'Médecin Général Jérôme MILOUNDJA', director_title: 'Recteur', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@usts.ga', website_url: 'https://www.usts.ga', description: 'Formation des cadres de santé et recherche médicale.', logo_url: null },
      { id: 5, name: 'Université Numérique du Gabon', acronym: 'UNG', director: 'François Jacques MAVOUNGOU', director_title: 'Coordonnateur Général', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@ung.ga', website_url: 'https://www.ung.ga', description: 'Université dédiée à l\'enseignement numérique.', logo_url: null }
    ],
    instituts: [
      { id: 6, name: 'Institut National des Sciences de Gestion', acronym: 'INSG', director: 'Natacha Murielle MBOUNA', director_title: 'Directeur Général', address: 'Libreville, Gabon', phone: '+241 01 72 XX XX', email: 'contact@insg.ga', website_url: 'https://www.insg.ga', description: 'Formation en gestion, comptabilité et management.', logo_url: null },
      { id: 7, name: 'Institut Supérieur de Technologie', acronym: 'IST', director: 'Jean Paul MAMBOUNDOU', director_title: 'Directeur Général', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@ist.ga', website_url: 'https://www.ist.ga', description: 'Formation technologique de niveau supérieur.', logo_url: null },
      { id: 8, name: "Institut Universitaire des Sciences de l'Organisation", acronym: 'IUSO', director: 'Aristide MENDAME EDZEGUE', director_title: 'Directeur Général', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@iuso.ga', website_url: 'https://www.iuso.ga', description: 'Sciences de l\'organisation et management.', logo_url: null },
      { id: 9, name: "Institut de Technologies d'Owendo", acronym: 'ITO', director: "Serge LANCHAIS M'BOUMBA", director_title: 'Directeur Général', address: 'Owendo, Gabon', phone: '+241 01 XX XX XX', email: 'contact@ito.ga', website_url: 'https://www.ito.ga', description: 'Formation aux métiers industriels.', logo_url: null }
    ],
    grandesEcoles: [
      { id: 10, name: 'École Normale Supérieure', acronym: 'ENS', director: '', director_title: 'Directeur Général', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@ens.ga', website_url: 'https://www.ens.ga', description: 'Formation des enseignants du secondaire.', logo_url: null },
      { id: 11, name: "École Normale Supérieure de l'Enseignement Technique", acronym: 'ENSET', director: 'Richard Guy KIBOUKA', director_title: 'Directeur Général', address: 'Libreville, Gabon', phone: '+241 01 XX XX XX', email: 'contact@enset.ga', website_url: 'https://www.enset.ga', description: 'Formation des enseignants techniques.', logo_url: null },
      { id: 12, name: 'École Polytechnique de Masuku', acronym: 'EPM', director: '', director_title: 'Directeur', address: 'Franceville, Haut-Ogooué', phone: '+241 01 XX XX XX', email: 'contact@epm.ga', website_url: 'https://www.epm.ga', description: 'Formation d\'ingénieurs.', logo_url: null }
    ],
    centresUniversitaires: [
      { id: 13, name: 'Centre Universitaire de Port-Gentil', acronym: 'CUPG', director: '', director_title: 'Directeur', address: 'Port-Gentil, Ogooué-Maritime', phone: '+241 01 XX XX XX', email: 'contact@cupg.ga', website_url: '', description: 'Antenne universitaire de l\'Ogooué-Maritime.', logo_url: null },
      { id: 14, name: 'Centre Universitaire de Mouila', acronym: 'CUM', director: '', director_title: 'Directeur', address: 'Mouila, Ngounié', phone: '+241 01 XX XX XX', email: 'contact@cum.ga', website_url: '', description: 'Antenne universitaire de la Ngounié.', logo_url: null },
      { id: 15, name: 'Centre Universitaire de Oyem', acronym: 'CUO', director: '', director_title: 'Directeur', address: 'Oyem, Woleu-Ntem', phone: '+241 01 XX XX XX', email: 'contact@cuo.ga', website_url: '', description: 'Antenne universitaire du Woleu-Ntem.', logo_url: null }
    ]
  };

  // Mapping des types Supabase vers les clés locales
  const typeMapping = {
    'Université': 'universites',
    'Institut': 'instituts',
    'Grande École': 'grandesEcoles',
    'Centre Universitaire': 'centresUniversitaires'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllEstablishments();
  }, []);

  const fetchAllEstablishments = async () => {
    setLoading(true);
    try {
      // Fetch all public establishment types
      const types = ['Université', 'Institut', 'Grande École', 'Centre Universitaire'];
      const results = {};

      for (const type of types) {
        const { data, error } = await supabase
          .from('establishments')
          .select('*')
          .eq('type', type)
          .order('name');

        const key = typeMapping[type];
        if (error || !data || data.length === 0) {
          // Use mock data as fallback
          results[key] = mockData[key];
        } else {
          results[key] = data;
        }
      }

      setEtablissementsData(results);
    } catch (error) {
      console.error('Error fetching establishments:', error);
      setEtablissementsData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'universites', label: 'Universités', icon: GraduationCap, color: 'blue' },
    { id: 'instituts', label: 'Instituts', icon: School, color: 'indigo' },
    { id: 'grandesEcoles', label: 'Grandes Écoles', icon: Landmark, color: 'amber' },
    { id: 'centresUniversitaires', label: 'Centres Universitaires', icon: Building2, color: 'teal' }
  ];

  const getTabColor = (tabId, isActive) => {
    const colors = {
      universites: isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50',
      instituts: isActive ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50',
      grandesEcoles: isActive ? 'bg-amber-600 text-white' : 'text-amber-600 hover:bg-amber-50',
      centresUniversitaires: isActive ? 'bg-teal-600 text-white' : 'text-teal-600 hover:bg-teal-50'
    };
    return colors[tabId];
  };

  const getAccentColor = () => {
    const colors = {
      universites: 'text-blue-600',
      instituts: 'text-indigo-600',
      grandesEcoles: 'text-amber-600',
      centresUniversitaires: 'text-teal-600'
    };
    return colors[activeTab];
  };

  const getBgGradient = () => {
    const gradients = {
      universites: 'from-blue-600 via-blue-700 to-blue-800',
      instituts: 'from-indigo-600 via-indigo-700 to-indigo-800',
      grandesEcoles: 'from-amber-500 via-amber-600 to-amber-700',
      centresUniversitaires: 'from-teal-600 via-teal-700 to-teal-800'
    };
    return gradients[activeTab];
  };

  const currentEstablishments = etablissementsData[activeTab] || [];
  
  const filteredEstablishments = currentEstablishments.filter(est =>
    est.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.director?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    universites: etablissementsData.universites.length,
    instituts: etablissementsData.instituts.length,
    grandesEcoles: etablissementsData.grandesEcoles.length,
    centresUniversitaires: etablissementsData.centresUniversitaires.length,
    total: Object.values(etablissementsData).flat().length
  };

  // Dashboard path based on active tab
  const getDashboardPath = () => {
    const paths = {
      universites: '/dashboard/etablissements-publics/universites',
      instituts: '/dashboard/etablissements-publics/instituts',
      grandesEcoles: '/dashboard/etablissements-publics/grandes-ecoles',
      centresUniversitaires: '/dashboard/etablissements-publics/centres-universitaires'
    };
    return paths[activeTab];
  };

  // Card Component - Same style as EstablishmentsList
  const EstablishmentCard = ({ establishment }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedEstablishment(establishment)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 cursor-pointer"
    >
      {/* Image/Logo */}
      <div className="relative w-[calc(100%-32px)] mx-auto mt-4 pt-[60%] rounded-2xl overflow-hidden bg-gradient-to-br from-gabon-green/10 to-gabon-blue/10">
        {establishment.logo_url ? (
          <img 
            src={establishment.logo_url} 
            alt={establishment.name}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-6xl font-bold ${getAccentColor()} opacity-20`}>
              {establishment.acronym?.substring(0, 3) || establishment.name.substring(0, 3)}
            </span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className={`text-xs font-bold ${getAccentColor()} uppercase tracking-wide`}>
            {tabs.find(t => t.id === activeTab)?.label.slice(0, -1) || 'Public'}
          </span>
        </div>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(getDashboardPath());
          }}
          className={`absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r ${getBgGradient()} hover:text-white`}
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-black mb-1 line-clamp-2 leading-tight">
          {establishment.name}
        </h3>
        <p className={`${getAccentColor()} font-semibold mb-3`}>
          {establishment.acronym}
        </p>

        {establishment.description && (
          <p className="text-neutral-gray-dark text-sm mb-4 line-clamp-2">
            {establishment.description}
          </p>
        )}

        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray-dark">
          {establishment.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{establishment.address.split(',')[0]}</span>
            </div>
          )}
          {establishment.director && (
            <div className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span className="truncate max-w-[150px]">{establishment.director}</span>
            </div>
          )}
        </div>

        {/* Website Button */}
        {establishment.website_url && (
          <a
            href={establishment.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`mt-4 w-full py-3 px-4 bg-neutral-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gradient-to-r ${getBgGradient()} transition-all duration-300 text-sm`}
          >
            Visiter le site
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );

  // Modal Component
  const EstablishmentModal = ({ establishment, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-gabon-green to-gabon-blue">
          {establishment.logo_url && (
            <img 
              src={establishment.logo_url} 
              alt={establishment.name}
              className="absolute inset-0 w-full h-full object-contain p-8 opacity-30"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold rounded-full mb-2">
              {tabs.find(t => t.id === activeTab)?.label.slice(0, -1) || 'Public'}
            </span>
            <h2 className="text-2xl font-bold">{establishment.name}</h2>
            <p className="text-white/80 font-medium">{establishment.acronym}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-192px)]">
          {establishment.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-black mb-2">Description</h3>
              <p className="text-neutral-gray-dark">{establishment.description}</p>
            </div>
          )}

          {establishment.director && (
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Directeur / Responsable</p>
                <p className="font-medium text-neutral-black">{establishment.director}</p>
              </div>
            </div>
          )}

          {establishment.address && (
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Adresse</p>
                <p className="font-medium text-neutral-black">{establishment.address}</p>
              </div>
            </div>
          )}

          {establishment.phone && (
            <div className="mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Téléphone</p>
                <p className="font-medium text-neutral-black">{establishment.phone}</p>
              </div>
            </div>
          )}

          {establishment.email && (
            <div className="mb-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Email</p>
                <a href={`mailto:${establishment.email}`} className="font-medium text-gabon-green hover:underline">
                  {establishment.email}
                </a>
              </div>
            </div>
          )}

          {establishment.website_url && (
            <a
              href={establishment.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-gabon-green text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gabon-green-dark transition-all duration-300"
            >
              <Globe className="w-5 h-5" />
              Visiter le site web
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Établissements Publics</h1>
            <p className="text-lg lg:text-xl opacity-95">Enseignement Supérieur Public au Gabon</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { icon: Building2, label: 'Total', value: stats.total, color: 'from-gabon-green to-gabon-green-dark' },
              { icon: GraduationCap, label: 'Universités', value: stats.universites, color: 'from-blue-500 to-blue-600' },
              { icon: School, label: 'Instituts', value: stats.instituts, color: 'from-indigo-500 to-indigo-600' },
              { icon: Landmark, label: 'Grandes Écoles', value: stats.grandesEcoles, color: 'from-amber-500 to-amber-600' },
              { icon: Building2, label: 'Centres Univ.', value: stats.centresUniversitaires, color: 'from-teal-500 to-teal-600' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-neutral-black">{stat.value}</div>
                <div className="text-xs text-neutral-gray-dark font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl p-2 shadow-lg mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${getTabColor(tab.id, isActive)}`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-current/10'}`}>
                      {etablissementsData[tab.id].length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Rechercher dans ${tabs.find(t => t.id === activeTab)?.label}...`}
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader className="w-10 h-10 text-gabon-green animate-spin" />
                </div>
              ) : filteredEstablishments.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-30">🔍</div>
                  <h3 className="text-2xl font-bold text-neutral-black mb-2">Aucun résultat</h3>
                  <p className="text-neutral-gray-dark">Aucun établissement ne correspond à votre recherche</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEstablishments.map((establishment) => (
                    <EstablishmentCard key={establishment.id} establishment={establishment} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedEstablishment && (
          <EstablishmentModal 
            establishment={selectedEstablishment} 
            onClose={() => setSelectedEstablishment(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EtablissementsPublics;
