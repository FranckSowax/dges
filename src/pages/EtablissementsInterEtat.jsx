import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe, Info, GraduationCap, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const EtablissementsInterEtat = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schools = [
    {
      id: 1,
      name: "École Inter-États des Sciences et Médecine Vétérinaire de Dakar",
      acronym: "EISMV",
      description: "L'EISMV est une institution régionale de formation et de recherche en médecine vétérinaire. Elle forme des docteurs vétérinaires et des ingénieurs agronomes de haut niveau pour l'Afrique de l'Ouest et du Centre.",
      location: "Dakar, Sénégal",
      filieres: ["Médecine Vétérinaire", "Productions Animales", "Santé Publique Vétérinaire", "Biotechnologie"],
      website: "https://www.eismv.org"
    },
    {
      id: 2,
      name: "Institut International d'Ingénierie de l'Eau et de l'Environnement",
      acronym: "2iE",
      description: "Le 2iE est un établissement panafricain d'enseignement supérieur et de recherche dans les domaines de l'eau, de l'énergie, de l'environnement et des infrastructures. Il forme des ingénieurs hautement qualifiés.",
      location: "Ouagadougou, Burkina Faso",
      filieres: ["Génie Civil", "Génie de l'Eau", "Énergies Renouvelables", "Environnement", "Informatique"],
      website: "https://www.2ie-edu.org"
    },
    {
      id: 3,
      name: "Institut Africain d'Informatique",
      acronym: "IAI",
      description: "L'IAI est un réseau d'instituts spécialisés dans la formation en technologies de l'information et de la communication. Il contribue au développement du secteur numérique en Afrique francophone.",
      location: "Libreville, Gabon (Siège régional)",
      filieres: ["Génie Logiciel", "Réseaux et Télécommunications", "Systèmes d'Information", "Cybersécurité"],
      website: "https://www.iai-siege.com/"
    },
    {
      id: 4,
      name: "Centre Régional Africain des Sciences et Technologies de l'Espace en Langue Française",
      acronym: "CRASTE-LF",
      description: "Le CRASTE-LF est un centre d'excellence régional spécialisé dans les sciences et technologies spatiales. Il forme des experts en télédétection, SIG et technologies spatiales.",
      location: "Rabat, Maroc",
      filieres: ["Télédétection", "Systèmes d'Information Géographique", "Météorologie Spatiale", "Gestion des Ressources Naturelles"],
      website: "https://crastelf.org.ma"
    },
    {
      id: 5,
      name: "École Africaine de Métiers de l'Architecture et de l'Urbanisme",
      acronym: "EAMAU",
      description: "L'EAMAU est une école inter-États spécialisée dans la formation en architecture et urbanisme. Elle forme des architectes, urbanistes et techniciens pour répondre aux besoins de développement urbain en Afrique.",
      location: "Lomé, Togo",
      filieres: ["Architecture", "Urbanisme", "Aménagement du Territoire", "Génie Civil"],
      website: "https://www.eamau.org"
    },
    {
      id: 6,
      name: "Institut Sous-Régional Multisectoriel de Technologie Appliquée, de Planification et d'Évaluation de Projets",
      acronym: "ISTA CEMAC",
      description: "L'ISTA est un établissement sous-régional de la CEMAC qui forme des cadres supérieurs dans les domaines de la technologie appliquée, de la planification et de l'évaluation de projets de développement.",
      location: "Douala, Cameroun",
      filieres: ["Planification", "Gestion de Projets", "Évaluation de Projets", "Études Économiques", "Technologies Appliquées"],
      website: "https://www.ista-cemac.org/"
    }
  ];

  const SchoolCard = ({ school }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedSchool(school)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-3 relative border-t-4 border-purple-600"
    >
      {/* Image Wrapper */}
      <div className="relative w-[calc(100%-32px)] mx-auto mt-4 pt-[calc(100%-32px)] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-purple-600/12 text-center px-5">
            {school.acronym}
          </span>
        </div>
        
        {/* Badge */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wide">
            Inter-État
          </span>
        </div>

        {/* International Stamp */}
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Globe className="w-8 h-8 text-purple-600" />
        </div>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/dashboard/etablissements');
          }}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-xl font-bold text-neutral-black mb-2 line-clamp-2 leading-tight">
          {school.name}
        </h3>
        <p className="text-purple-600 font-semibold text-sm mb-4">
          {school.acronym}
        </p>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-neutral-gray-dark text-sm mb-5">
          <MapPin className="w-4 h-4" />
          {school.location}
        </div>

        {/* Footer */}
        <button className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
          Voir les détails
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 relative overflow-hidden">
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
              Enseignement Supérieur Inter-État
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 font-light mb-5">
              Établissements Internationaux et Régionaux
            </p>
            <div className="inline-block px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider">
              🌍 Coopération Régionale
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 rounded-2xl p-8 flex items-start gap-5 shadow-md"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                Établissements Inter-États
              </h3>
              <p className="text-neutral-gray-dark leading-relaxed">
                Ces établissements résultent d'accords de coopération entre plusieurs pays africains. Ils offrent des formations d'excellence et contribuent au développement de l'enseignement supérieur à l'échelle régionale et continentale. Les étudiants gabonais peuvent y accéder via des concours organisés par la DGES.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center"
          >
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent mb-2">
              {schools.length}
            </div>
            <div className="text-neutral-gray-dark font-medium text-lg">
              Établissements Inter-États Partenaires
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-8 pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school) => (
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
              <div className="p-9 border-b border-neutral-gray-light flex justify-between items-start gap-5 bg-gradient-to-r from-purple-50 to-white">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-neutral-black mb-2 leading-tight">
                    {selectedSchool.name}
                  </h2>
                  <p className="text-lg text-neutral-gray-dark font-semibold mb-3">
                    {selectedSchool.acronym}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                    <Globe className="w-4 h-4" />
                    Établissement Inter-État
                  </div>
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
                {/* Description */}
                {selectedSchool.description && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <Info className="w-5 h-5 text-purple-600" />
                      À propos
                    </h3>
                    <p className="text-neutral-gray-dark leading-relaxed">
                      {selectedSchool.description}
                    </p>
                  </div>
                )}

                {/* Location */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Localisation
                  </h3>
                  <div className="p-4 bg-neutral-background rounded-2xl flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Siège</div>
                      <div className="text-sm text-neutral-black font-medium">{selectedSchool.location}</div>
                    </div>
                  </div>
                </div>

                {/* Filières */}
                {selectedSchool.filieres && selectedSchool.filieres.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      Domaines de Formation
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedSchool.filieres.map((filiere, idx) => (
                        <span key={idx} className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl text-sm font-semibold">
                          {filiere}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Website */}
                {selectedSchool.website && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <Globe className="w-5 h-5 text-purple-600" />
                      Site Web
                    </h3>
                    <div className="p-4 bg-neutral-background rounded-2xl flex items-center gap-3">
                      <Globe className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Site Web</div>
                        <a 
                          href={selectedSchool.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 font-medium hover:underline"
                        >
                          {selectedSchool.website}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-gray-light flex gap-3">
                {selectedSchool.website && (
                  <a
                    href={selectedSchool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    Visiter le site web
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

export default EtablissementsInterEtat;
