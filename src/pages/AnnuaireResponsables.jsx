import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, User as UserIcon } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const AnnuaireResponsables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '15', label: 'Responsables' },
    { number: '4', label: 'Directions' },
    { number: '12', label: 'Services' }
  ];

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'direction', label: 'Direction' },
    { id: 'universites', label: 'Universités' },
    { id: 'orientation', label: 'Orientation' },
    { id: 'partenariats', label: 'Partenariats' }
  ];

  const directionGenerale = [
    {
      id: 1,
      name: 'Alain SOUZA',
      position: 'Directeur Général',
      initials: 'AS',
      department: 'Direction Générale',
      category: 'direction'
    },
    {
      id: 2,
      name: 'Hugues Martial OMANDA',
      position: 'Directeur Général Adjoint',
      initials: 'HM',
      department: 'Direction Générale',
      category: 'direction'
    }
  ];

  const responsables = [
    {
      id: 3,
      name: 'Emma Nadège MAWILI Espe. NGOUALI FILS',
      position: 'Directrice',
      initials: 'EN',
      department: 'Universités',
      category: 'universites'
    },
    {
      id: 4,
      name: 'Thierry NDONG NNANG',
      position: 'Chef de Service Universités',
      initials: 'TN',
      department: 'Service Universités',
      category: 'universites'
    },
    {
      id: 5,
      name: 'Sylvain MOUISSI',
      position: 'Chef de Service Universités',
      initials: 'SM',
      department: 'Service Universités',
      category: 'universites'
    },
    {
      id: 6,
      name: 'Jean BISSIELOU',
      position: 'Chef de Service Universités',
      initials: 'JB',
      department: 'Service Universités',
      category: 'universites'
    },
    {
      id: 7,
      name: 'Justin PENDI',
      position: 'Directeur d\'Orientation et des Bourses',
      initials: 'JP',
      department: 'Orientation',
      category: 'orientation'
    },
    {
      id: 8,
      name: 'Mathieu ASSOUME ELLA',
      position: 'Chef de Service Statistiques',
      initials: 'MA',
      department: 'Service Statistiques',
      category: 'orientation'
    },
    {
      id: 9,
      name: 'Valérie NYANGONO NDONG',
      position: 'Chef de Service Bourses',
      initials: 'VN',
      department: 'Service Bourses',
      category: 'orientation'
    },
    {
      id: 10,
      name: 'Léa KOUSSOU',
      position: 'Chef de Service Orientation',
      initials: 'LK',
      department: 'Service Orientation',
      category: 'orientation'
    },
    {
      id: 11,
      name: 'Mr Arys CHALLA BOULOCKO',
      position: 'Directeur des partenariats institutionnels',
      initials: 'AC',
      department: 'Partenariats',
      category: 'partenariats'
    },
    {
      id: 12,
      name: 'Clarisse MIHINDOU MATONOU ép. BOUSSENGA',
      position: 'Chef de Service Afrique/CEMAC',
      initials: 'CM',
      department: 'Service Afrique/CEMAC',
      category: 'partenariats'
    },
    {
      id: 13,
      name: 'Philippe de Padoue NZIENGUI',
      position: 'Chef de Service',
      initials: 'PN',
      department: 'Partenariats',
      category: 'partenariats'
    }
  ];

  const filteredResponsables = responsables.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || person.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredDirection = directionGenerale.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || person.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const ResponsableCard = ({ person, isDirection = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isDirection ? 'border-2 border-gabon-green/20' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative pt-[100%] bg-gradient-to-br from-gabon-green-light to-gabon-blue-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-gabon-green/30">
            {person.initials}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-gabon-yellow-light to-gabon-yellow/30 text-gabon-yellow-dark text-xs font-bold rounded-full mb-3 uppercase">
          {person.department}
        </span>
        
        <h3 className={`font-bold text-neutral-black mb-2 leading-tight ${
          isDirection ? 'text-xl' : 'text-lg'
        }`}>
          {person.name}
        </h3>
        
        <p className="text-gabon-blue font-semibold text-sm mb-4">
          {person.position}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            Contacter
          </button>
          <button className="px-4 py-2.5 bg-neutral-background text-neutral-black rounded-lg font-medium hover:bg-neutral-gray-light transition-colors border border-neutral-gray-light">
            <UserIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gabon-green via-gabon-green-dark to-gabon-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 36px)',
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Annuaire des Responsables
            </h1>
            <p className="text-xl text-white/90">
              Direction Générale de l'Enseignement Supérieur
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-neutral-background to-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-gabon-green to-gabon-blue bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-gray-dark font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-neutral-gray-light sticky top-[88px] z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher un responsable..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-gray-light rounded-xl focus:border-gabon-green focus:outline-none focus:ring-2 focus:ring-gabon-green/20 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap justify-center">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white shadow-md'
                      : 'bg-neutral-background text-neutral-black hover:bg-neutral-gray-light border border-neutral-gray-light'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          {/* Direction Générale */}
          {(activeFilter === 'all' || activeFilter === 'direction') && filteredDirection.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-neutral-black mb-8 text-center relative pb-4"
              >
                Direction Générale
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-gabon-green to-gabon-blue rounded-full" />
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {filteredDirection.map((person, index) => (
                  <ResponsableCard key={person.id} person={person} isDirection={true} />
                ))}
              </div>
            </div>
          )}

          {/* Autres Responsables */}
          {filteredResponsables.length > 0 && (
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-neutral-black mb-8 text-center relative pb-4"
              >
                Responsables des Services
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-gabon-green to-gabon-blue rounded-full" />
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResponsables.map((person, index) => (
                  <ResponsableCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredDirection.length === 0 && filteredResponsables.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-neutral-black mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-neutral-gray-dark">
                Essayez de modifier votre recherche ou vos filtres
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnuaireResponsables;
