import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, ExternalLink, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const EtablissementsPublics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '5', label: 'Universités' },
    { number: '5', label: 'Instituts' },
    { number: '3', label: 'Grandes Écoles' },
    { number: '4', label: 'Centres Universitaires' }
  ];

  const universites = [
    {
      id: 1,
      name: 'Université Omar Bongo',
      acronym: 'UOB',
      location: 'Libreville',
      type: 'Université',
      website: 'https://univuob.org/'
    },
    {
      id: 2,
      name: 'Université des Sciences et Techniques de Masuku',
      acronym: 'USTM',
      location: 'Franceville',
      type: 'Université',
      website: 'https://univ-masuku.org/'
    },
    {
      id: 3,
      name: 'Université des Sciences Techniques de la Santé',
      acronym: 'USTS',
      location: 'Libreville',
      type: 'Université',
      website: '#'
    },
    {
      id: 4,
      name: 'Université des Sciences de la Santé',
      acronym: 'USS',
      location: 'Libreville',
      type: 'Université',
      website: 'https://www.uss-universite.ga'
    },
    {
      id: 5,
      name: 'Université Numérique du Gabon',
      acronym: 'UNG',
      location: 'Libreville',
      type: 'Université',
      website: 'https://www.ung.ga/'
    }
  ];

  const instituts = [
    {
      id: 6,
      name: 'Institut Supérieur de Technologie',
      acronym: 'IST',
      location: 'Libreville',
      type: 'Institut',
      website: '#'
    },
    {
      id: 7,
      name: 'Institut National de Sciences de Gestion',
      acronym: 'INSG',
      location: 'Libreville',
      type: 'Institut',
      website: '#'
    },
    {
      id: 8,
      name: "Institut National Supérieur d'Agronomie et de Biotechnologies",
      acronym: 'INSAB',
      location: 'Libreville',
      type: 'Institut',
      website: '#'
    },
    {
      id: 9,
      name: "Institut Technologique d'Owendo",
      acronym: 'ITO',
      location: 'Owendo',
      type: 'Institut',
      website: '#'
    },
    {
      id: 10,
      name: "Institut Universitaire des Sciences de l'Organisation",
      acronym: 'IUSO',
      location: 'Libreville',
      type: 'Institut',
      website: 'https://iuso-sne.com'
    }
  ];

  const ecoles = [
    {
      id: 11,
      name: 'École Normale Supérieure',
      acronym: 'ENS',
      location: 'Libreville',
      type: 'École',
      website: 'https://enslibreville.org'
    },
    {
      id: 12,
      name: 'École Polytechnique de Masuku',
      acronym: 'EPM',
      location: 'Franceville',
      type: 'École',
      website: '#'
    },
    {
      id: 13,
      name: "École Normale Supérieure d'Enseignement Technique",
      acronym: 'ENSET',
      location: 'Libreville',
      type: 'École',
      website: '#'
    }
  ];

  const centres = [
    {
      id: 14,
      name: 'Centre Hospitalier Universitaire de Libreville',
      acronym: 'CHUL',
      location: 'Libreville',
      type: 'Centre',
      website: '#'
    },
    {
      id: 15,
      name: "Centre Hospitalier Universitaire d'Owendo",
      acronym: 'CHU Owendo',
      location: 'Owendo',
      type: 'Centre',
      website: '#'
    },
    {
      id: 16,
      name: "Centre Universitaire Provincial de l'Ogooue-Lolo",
      acronym: 'CUP Ogooue-Lolo',
      location: 'Koulamoutou',
      type: 'Centre',
      website: '#'
    },
    {
      id: 17,
      name: "Hôpital d'instruction des Armées d'Akanda",
      acronym: 'HIA Akanda',
      location: 'Akanda',
      type: 'Centre',
      website: 'https://hiaobo.ga/'
    }
  ];

  const EstablishmentCard = ({ establishment }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3"
    >
      {/* Image Wrapper */}
      <div className="relative w-[calc(100%-32px)] mx-auto mt-4 pt-[calc(100%-32px)] rounded-2xl overflow-hidden bg-gradient-to-br from-gabon-green-light to-gabon-blue-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-gabon-green/20">
            {establishment.acronym.substring(0, 3)}
          </span>
        </div>
        
        {/* Badge */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-xs font-bold text-gabon-green uppercase tracking-wide">
            {establishment.type}
          </span>
        </div>

        {/* Edit Button - Visible on hover */}
        <button
          onClick={() => navigate('/dashboard/etablissements')}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gabon-green hover:text-white"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-2xl font-bold text-neutral-black mb-2 line-clamp-2 leading-tight">
          {establishment.name}
        </h3>
        <p className="text-neutral-gray-dark font-medium mb-5">
          {establishment.acronym}
        </p>

        {/* Info */}
        <div className="flex items-center gap-6 pb-6 mb-6 border-b border-neutral-gray-light">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neutral-gray-dark" />
            <span className="font-medium text-neutral-black">{establishment.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-neutral-gray-dark" />
            <span className="font-medium text-neutral-black">Public</span>
          </div>
        </div>

        {/* Footer */}
        <a
          href={establishment.website}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 bg-neutral-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gabon-green transition-all duration-300 hover:-translate-y-1"
        >
          Site web
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );

  const Section = ({ title, subtitle, establishments }) => (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-neutral-black mb-3">{title}</h2>
        <p className="text-lg text-neutral-gray-dark">{subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {establishments.map((establishment) => (
          <EstablishmentCard key={establishment.id} establishment={establishment} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-gabon-green via-gabon-blue to-gabon-green relative overflow-hidden">
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
              Enseignement Supérieur Public
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 font-light">
              Établissements d'excellence au Gabon
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-4 gap-10"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-gabon-green via-gabon-blue to-gabon-green bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-gray-dark font-medium text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        <Section
          title="Universités"
          subtitle="Établissements universitaires publics du Gabon"
          establishments={universites}
        />

        <Section
          title="Instituts"
          subtitle="Instituts spécialisés d'enseignement supérieur"
          establishments={instituts}
        />

        <Section
          title="Grandes Écoles"
          subtitle="Établissements d'excellence et de formation spécialisée"
          establishments={ecoles}
        />

        <Section
          title="Centres Universitaires"
          subtitle="Centres hospitaliers et universitaires"
          establishments={centres}
        />
      </div>

      <Footer />
    </div>
  );
};

export default EtablissementsPublics;
