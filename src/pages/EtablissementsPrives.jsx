import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Phone, Mail, Globe, ExternalLink, Edit, GraduationCap, Award, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const EtablissementsPrives = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schools = [
    {
      id: 1,
      name: "Ecole Supérieure des Technologies d'Informatiques et de Management",
      acronym: "ESTIM",
      tagline: "Rigueur - Ethique - Qualité Scientifique",
      responsable: "Mr Alain ITSOUKIGA",
      filieres: ["Informatique", "Management", "Réseaux", "Développement"],
      diplomes: ["Licence", "Master", "BTS"],
      phone: "+241 XX XX XX XX",
      email: "contact@estim.ga",
      address: "Libreville, Gabon",
      website: "https://www.estim.ga",
      specialties: ["Informatique", "Management"]
    },
    {
      id: 2,
      name: "Université Marie NZABA",
      acronym: "UMN",
      tagline: "Excellence et Innovation",
      responsable: "",
      filieres: ["Droit", "Economie", "Gestion", "Sciences Politiques"],
      diplomes: ["Licence", "Master", "Doctorat"],
      phone: "+241 XX XX XX XX",
      email: "contact@umn.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Droit", "Gestion"]
    },
    {
      id: 3,
      name: "Collège de Paris",
      acronym: "CDP",
      tagline: "Formation d'Excellence",
      responsable: "",
      filieres: ["Commerce", "Marketing", "Communication", "Digital"],
      diplomes: ["Bachelor", "MBA"],
      phone: "+241 XX XX XX XX",
      email: "contact@cdp.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Commerce", "Management"]
    },
    {
      id: 4,
      name: "Université de Recherche CETONE",
      acronym: "URC",
      tagline: "Recherche et Innovation",
      responsable: "",
      filieres: ["Sciences", "Recherche", "Technologie"],
      diplomes: ["Master", "Doctorat"],
      phone: "+241 XX XX XX XX",
      email: "contact@urc.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Ingénierie"]
    },
    {
      id: 5,
      name: "Université Numérique Eco-Africaine",
      acronym: "UNEA",
      tagline: "Formation Digitale",
      responsable: "",
      filieres: ["Informatique", "Digital", "E-Learning"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@unea.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Informatique"]
    },
    {
      id: 6,
      name: "Université Privée Islamique du GABON",
      acronym: "UPIG",
      tagline: "Savoir et Foi",
      responsable: "",
      filieres: ["Droit", "Economie", "Sciences Islamiques"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@upig.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Droit"]
    },
    {
      id: 7,
      name: "Institut Supérieur de Management Public 2",
      acronym: "ISMAP2",
      tagline: "Management Public",
      responsable: "",
      filieres: ["Management Public", "Administration", "Gestion"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@ismap2.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Management", "Gestion"]
    },
    {
      id: 8,
      name: "Entrepreneuriat Business GABON",
      acronym: "EBS GABON",
      tagline: "Entrepreneuriat et Innovation",
      responsable: "",
      filieres: ["Entrepreneuriat", "Business", "Innovation"],
      diplomes: ["Bachelor", "MBA"],
      phone: "+241 XX XX XX XX",
      email: "contact@ebs.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Commerce", "Management"]
    },
    {
      id: 9,
      name: "Polytechnic University Médian",
      acronym: "POLYMED",
      tagline: "Excellence Polytechnique",
      responsable: "",
      filieres: ["Ingénierie", "Technologie", "Sciences"],
      diplomes: ["Licence", "Master", "Ingénieur"],
      phone: "+241 XX XX XX XX",
      email: "contact@polymed.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Ingénierie"]
    },
    {
      id: 10,
      name: "Institut en Sciences Humaines Daniel BROTTIER",
      acronym: "ISSHDB",
      tagline: "Sciences Humaines",
      responsable: "",
      filieres: ["Sciences Humaines", "Sociologie", "Psychologie"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@isshdb.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Gestion"]
    },
    {
      id: 11,
      name: "Institut de Formation en Assurance et Gestion",
      acronym: "IFAG",
      tagline: "Assurance et Gestion",
      responsable: "",
      filieres: ["Assurance", "Gestion", "Finance"],
      diplomes: ["BTS", "Licence"],
      phone: "+241 XX XX XX XX",
      email: "contact@ifag.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Gestion"]
    },
    {
      id: 12,
      name: "E-TECH Institute",
      acronym: "E-TECH",
      tagline: "Technologies de l'Information",
      responsable: "",
      filieres: ["Informatique", "Réseaux", "Cybersécurité"],
      diplomes: ["BTS", "Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@etech.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Informatique"]
    },
    {
      id: 13,
      name: "Institut Supérieur des Technologies de l'Information et du Numérique",
      acronym: "ISTIN",
      tagline: "Digital et Innovation",
      responsable: "",
      filieres: ["Informatique", "Digital", "Télécommunications"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@istin.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Informatique"]
    },
    {
      id: 14,
      name: "Institut de Santé et Polytechnique de PROCCL",
      acronym: "ISPPROCCL",
      tagline: "Santé et Technologies",
      responsable: "",
      filieres: ["Santé", "Soins Infirmiers", "Analyse Médicale"],
      diplomes: ["Licence", "DUT"],
      phone: "+241 XX XX XX XX",
      email: "contact@ispproccl.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Santé"]
    },
    {
      id: 15,
      name: "Institut des Sciences et des Métiers de la Mer",
      acronym: "ISMM",
      tagline: "Sciences Maritimes",
      responsable: "",
      filieres: ["Sciences de la Mer", "Navigation", "Aquaculture"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@ismm.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Ingénierie"]
    },
    {
      id: 16,
      name: "Institut International de Technologie et de Gestion",
      acronym: "IITG",
      tagline: "Technologie et Gestion",
      responsable: "",
      filieres: ["Technologie", "Gestion", "Management"],
      diplomes: ["BTS", "Licence"],
      phone: "+241 XX XX XX XX",
      email: "contact@iitg.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Gestion", "Informatique"]
    },
    {
      id: 17,
      name: "Institut Universitaire de Formation Professionnelle",
      acronym: "IUFP",
      tagline: "Formation Professionnelle",
      responsable: "",
      filieres: ["Formation Professionnelle", "Métiers"],
      diplomes: ["BTS", "Certificat Professionnel"],
      phone: "+241 XX XX XX XX",
      email: "contact@iufp.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Gestion"]
    },
    {
      id: 18,
      name: "Ecole Supérieure de Formation et d'Insertion Professionnelle",
      acronym: "ESFIP",
      tagline: "Insertion Professionnelle",
      responsable: "",
      filieres: ["Formation", "Insertion", "Métiers"],
      diplomes: ["BTS", "Certificat"],
      phone: "+241 XX XX XX XX",
      email: "contact@esfip.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Gestion"]
    },
    {
      id: 19,
      name: "Université Libreville Nord",
      acronym: "ULN",
      tagline: "Excellence Universitaire",
      responsable: "",
      filieres: ["Droit", "Economie", "Gestion", "Informatique"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@uln.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Droit", "Gestion"]
    },
    {
      id: 20,
      name: "Université des Sciences Appliquées et de Droit",
      acronym: "USAD",
      tagline: "Sciences et Droit",
      responsable: "",
      filieres: ["Sciences", "Droit", "Technologie"],
      diplomes: ["Licence", "Master"],
      phone: "+241 XX XX XX XX",
      email: "contact@usad.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Droit", "Ingénierie"]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'Informatique', label: 'Informatique' },
    { value: 'Gestion', label: 'Gestion' },
    { value: 'Commerce', label: 'Commerce' },
    { value: 'Santé', label: 'Santé' },
    { value: 'Ingénierie', label: 'Ingénierie' },
    { value: 'Management', label: 'Management' }
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.acronym.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = currentFilter === 'all' || 
                         school.specialties.some(s => s.includes(currentFilter));
    return matchesSearch && matchesFilter;
  });

  const SchoolCard = ({ school }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedSchool(school)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-3 relative"
    >
      {/* Image Wrapper */}
      <div className="relative w-[calc(100%-24px)] mx-auto mt-3 pt-[calc(100%-24px)] rounded-2xl overflow-hidden bg-gradient-to-br from-gabon-blue-light to-gabon-green-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-gabon-blue/20">
            {school.acronym.substring(0, 3)}
          </span>
        </div>
        
        {/* Badge */}
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold text-gabon-blue uppercase tracking-wide">
            Privé
          </span>
        </div>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/dashboard/etablissements');
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gabon-blue hover:text-white"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-neutral-black mb-1.5 line-clamp-2 leading-tight">
          {school.name}
        </h3>
        <p className="text-neutral-gray-dark font-semibold text-sm mb-3">
          {school.acronym}
        </p>

        {/* Specialties */}
        <div className="flex gap-1.5 flex-wrap">
          {school.specialties.slice(0, 3).map((specialty, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-gabon-blue-light text-gabon-blue rounded-xl text-xs font-semibold">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-gabon-blue via-gabon-green to-gabon-blue relative overflow-hidden">
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
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Enseignement Supérieur Privé
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 font-light">
              Établissements privés d'enseignement supérieur au Gabon
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center"
          >
            <div className="text-6xl font-bold bg-gradient-to-r from-gabon-blue via-gabon-green to-gabon-blue bg-clip-text text-transparent mb-2">
              {schools.length}
            </div>
            <div className="text-neutral-gray-dark font-medium text-lg">
              Établissements Privés Agréés
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher un établissement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 border-2 border-neutral-gray-light rounded-2xl text-base focus:outline-none focus:border-gabon-blue transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2.5 flex-wrap">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    currentFilter === option.value
                      ? 'bg-gabon-blue text-white'
                      : 'bg-neutral-background text-neutral-gray-dark border-2 border-neutral-gray-light hover:border-gabon-blue'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-8 pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSchool(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="p-9 border-b border-neutral-gray-light flex justify-between items-start gap-5">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-neutral-black mb-2 leading-tight">
                    {selectedSchool.name}
                  </h2>
                  <p className="text-lg text-neutral-gray-dark font-semibold mb-2">
                    {selectedSchool.acronym}
                  </p>
                  <p className="text-sm text-gabon-blue italic font-medium">
                    {selectedSchool.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className="w-10 h-10 bg-neutral-background rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:rotate-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-9 space-y-8">
                {/* Responsable */}
                {selectedSchool.responsable && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <User className="w-5 h-5 text-gabon-blue" />
                      Responsable Pédagogique
                    </h3>
                    <div className="p-4 bg-neutral-background rounded-2xl">
                      <p className="font-medium text-neutral-black">{selectedSchool.responsable}</p>
                    </div>
                  </div>
                )}

                {/* Filières */}
                {selectedSchool.filieres && selectedSchool.filieres.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <GraduationCap className="w-5 h-5 text-gabon-blue" />
                      Filières Homologuées
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedSchool.filieres.map((filiere, idx) => (
                        <span key={idx} className="px-3.5 py-2 bg-gradient-to-r from-gabon-blue to-gabon-green text-white rounded-2xl text-sm font-semibold">
                          {filiere}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diplômes */}
                {selectedSchool.diplomes && selectedSchool.diplomes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <Award className="w-5 h-5 text-gabon-blue" />
                      Diplômes Autorisés
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedSchool.diplomes.map((diplome, idx) => (
                        <span key={idx} className="px-3.5 py-2 bg-gradient-to-r from-gabon-green to-gabon-blue text-white rounded-2xl text-sm font-semibold">
                          {diplome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contacts */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-gabon-blue" />
                    Coordonnées
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedSchool.address && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <MapPin className="w-5 h-5 text-gabon-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Adresse</div>
                          <div className="text-sm text-neutral-black font-medium">{selectedSchool.address}</div>
                        </div>
                      </div>
                    )}
                    {selectedSchool.phone && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <Phone className="w-5 h-5 text-gabon-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Téléphone</div>
                          <div className="text-sm text-neutral-black font-medium">{selectedSchool.phone}</div>
                        </div>
                      </div>
                    )}
                    {selectedSchool.email && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <Mail className="w-5 h-5 text-gabon-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Email</div>
                          <div className="text-sm text-neutral-black font-medium">{selectedSchool.email}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-gray-light flex gap-3">
                {selectedSchool.website && (
                  <a
                    href={selectedSchool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-neutral-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gabon-blue transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    Site Web
                  </a>
                )}
                <button
                  onClick={() => setSelectedSchool(null)}
                  className="flex-1 py-3.5 px-6 bg-neutral-background text-neutral-black rounded-2xl font-semibold border-2 border-neutral-gray-light hover:border-neutral-black transition-all"
                >
                  Fermer
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

export default EtablissementsPrives;
