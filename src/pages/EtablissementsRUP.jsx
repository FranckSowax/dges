import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Globe, CheckCircle, Info, GraduationCap, User, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const EtablissementsRUP = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schools = [
    {
      id: 1,
      name: "Institut du Pétrole et du Gaz",
      acronym: "IPG",
      description: "L'Institut du Pétrole et du Gaz est un établissement de formation supérieure spécialisé dans les métiers du secteur pétrolier et gazier. Il offre des formations de haut niveau pour répondre aux besoins de l'industrie énergétique au Gabon et en Afrique Centrale.",
      responsable: "",
      filieres: ["Géologie Pétrolière", "Ingénierie Pétrolière", "Raffinage", "Géophysique", "Management Pétrolier"],
      phone: "+241 XX XX XX XX",
      email: "contact@ipg.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Pétrole", "Gaz", "Énergie"]
    },
    {
      id: 2,
      name: "École de Mine et Métallurgie de Moanda",
      acronym: "E3M",
      description: "L'École de Mine et Métallurgie de Moanda est un établissement spécialisé dans la formation des cadres pour l'industrie minière et métallurgique. Située au cœur de la région minière de Moanda, elle forme des ingénieurs et techniciens de haut niveau.",
      responsable: "",
      filieres: ["Génie Minier", "Métallurgie", "Géologie Minière", "Exploitation Minière", "Traitement des Minerais"],
      phone: "+241 XX XX XX XX",
      email: "contact@e3m.ga",
      address: "Moanda, Gabon",
      website: "",
      specialties: ["Mines", "Métallurgie", "Géologie"]
    },
    {
      id: 3,
      name: "Université Franco-Gabonaise de Saint Exupéry",
      acronym: "UFGSE",
      description: "L'Université Franco-Gabonaise de Saint Exupéry est un établissement bilingue offrant des formations d'excellence en partenariat avec des universités françaises. Elle propose des programmes dans divers domaines avec une forte orientation internationale.",
      responsable: "",
      filieres: ["Droit", "Économie", "Gestion", "Commerce International", "Sciences Politiques", "Communication"],
      phone: "+241 XX XX XX XX",
      email: "contact@ufgse.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Droit", "Économie", "Gestion"]
    },
    {
      id: 4,
      name: "Institut des Hautes Études Économiques et Entrepreneuriales",
      acronym: "IHEE",
      description: "L'IHEE est un institut spécialisé dans la formation en économie, finance et entrepreneuriat. Il vise à former des leaders économiques et des entrepreneurs capables de contribuer au développement économique du Gabon.",
      responsable: "",
      filieres: ["Économie", "Finance", "Entrepreneuriat", "Management", "Comptabilité", "Audit"],
      phone: "+241 XX XX XX XX",
      email: "contact@ihee.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Économie", "Finance", "Entrepreneuriat"]
    },
    {
      id: 5,
      name: "Université Africaine des Sciences",
      acronym: "UAS",
      description: "L'Université Africaine des Sciences est un établissement panafricain dédié à l'excellence scientifique et technologique. Elle offre des programmes innovants en sciences, technologies et ingénierie pour former les scientifiques de demain.",
      responsable: "",
      filieres: ["Mathématiques", "Physique", "Chimie", "Biologie", "Informatique", "Ingénierie"],
      phone: "+241 XX XX XX XX",
      email: "contact@uas.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Sciences", "Technologies", "Ingénierie"]
    },
    {
      id: 6,
      name: "École Supérieure des Arts et des Métiers / Institut Universitaire des Sciences de Développement",
      acronym: "ESAM/IUSD",
      description: "L'ESAM/IUSD est un double établissement offrant à la fois des formations en arts et métiers techniques, ainsi qu'en sciences du développement. Il combine excellence technique et vision stratégique du développement durable.",
      responsable: "",
      filieres: ["Arts et Métiers", "Développement Durable", "Génie Mécanique", "Électromécanique", "Sciences du Développement", "Aménagement du Territoire"],
      phone: "+241 XX XX XX XX",
      email: "contact@esam-iusd.ga",
      address: "Libreville, Gabon",
      website: "",
      specialties: ["Arts et Métiers", "Développement"]
    }
  ];

  const SchoolCard = ({ school }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedSchool(school)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-3 relative border-t-4 border-emerald-600"
    >
      {/* Image Wrapper */}
      <div className="relative w-[calc(100%-32px)] mx-auto mt-4 pt-[calc(100%-32px)] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-emerald-600/15 text-center px-5">
            {school.acronym}
          </span>
        </div>
        
        {/* Badge */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wide">
            RUP
          </span>
        </div>

        {/* RUP Stamp */}
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/dashboard/etablissements');
          }}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:text-white"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-xl font-bold text-neutral-black mb-2 line-clamp-2 leading-tight">
          {school.name}
        </h3>
        <p className="text-neutral-gray-dark font-semibold text-sm mb-4">
          {school.acronym}
        </p>
        <p className="text-sm text-neutral-gray-dark line-clamp-3 mb-5 leading-relaxed">
          {school.description}
        </p>

        {/* Footer */}
        <button className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
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
      <section className="pt-32 pb-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 relative overflow-hidden">
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
              Enseignement Supérieur RUP
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 font-light mb-5">
              Établissements Reconnus d'Utilité Publique
            </p>
            <div className="inline-block px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider">
              Reconnaissance d'Utilité Publique
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
            className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-600 rounded-2xl p-8 flex items-start gap-5 shadow-md"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Qu'est-ce que la RUP ?
              </h3>
              <p className="text-neutral-gray-dark leading-relaxed">
                La Reconnaissance d'Utilité Publique (RUP) est un statut accordé aux établissements privés d'enseignement supérieur qui répondent aux normes de qualité et d'excellence définies par l'État gabonais. Ces établissements contribuent de manière significative au développement de l'enseignement supérieur et à la formation de qualité des étudiants.
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
            <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mb-2">
              {schools.length}
            </div>
            <div className="text-neutral-gray-dark font-medium text-lg">
              Établissements Reconnus d'Utilité Publique
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
              <div className="p-9 border-b border-neutral-gray-light flex justify-between items-start gap-5 bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-neutral-black mb-2 leading-tight">
                    {selectedSchool.name}
                  </h2>
                  <p className="text-lg text-neutral-gray-dark font-semibold mb-3">
                    {selectedSchool.acronym}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                    <CheckCircle className="w-4 h-4" />
                    Reconnu d'Utilité Publique
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
                      <Info className="w-5 h-5 text-emerald-600" />
                      À propos
                    </h3>
                    <p className="text-neutral-gray-dark leading-relaxed">
                      {selectedSchool.description}
                    </p>
                  </div>
                )}

                {/* Responsable */}
                {selectedSchool.responsable && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                      <User className="w-5 h-5 text-emerald-600" />
                      Direction
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
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                      Domaines de Formation
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedSchool.filieres.map((filiere, idx) => (
                        <span key={idx} className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl text-sm font-semibold">
                          {filiere}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contacts */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-black mb-4 flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    Coordonnées
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedSchool.address && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Adresse</div>
                          <div className="text-sm text-neutral-black font-medium">{selectedSchool.address}</div>
                        </div>
                      </div>
                    )}
                    {selectedSchool.phone && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-neutral-gray-dark font-semibold uppercase tracking-wide mb-1">Téléphone</div>
                          <div className="text-sm text-neutral-black font-medium">{selectedSchool.phone}</div>
                        </div>
                      </div>
                    )}
                    {selectedSchool.email && (
                      <div className="flex items-start gap-3 p-4 bg-neutral-background rounded-2xl">
                        <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
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

export default EtablissementsRUP;
