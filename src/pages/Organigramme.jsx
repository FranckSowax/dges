import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const Organigramme = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const servicesAppui = [
    "Service Courrier, Archives et Documentation",
    "Service Ressources Humaines et Moyens",
    "Service Systèmes d'Information, Études et Statistiques"
  ];

  const directions = [
    {
      title: "Direction de l'Enseignement Normal",
      services: [
        "Service Formation Initiale et Continue du Pré-Primaire et Primaire",
        "Service Formation Initiale et Continue du Secondaire",
        "Service Recherche Psychopédagogique"
      ]
    },
    {
      title: "Direction de l'Orientation et des Bourses",
      services: [
        "Service Orientation",
        "Service Bourses",
        "Service Statistiques"
      ]
    },
    {
      title: "Direction des Universités Grandes Écoles et Instituts",
      services: [
        "Service Université",
        "Service Grandes Écoles et Instituts",
        "Service Centres de Recherche"
      ]
    },
    {
      title: "Direction des Partenariats Institutionnels",
      services: [
        "Service Afrique et CEMAC",
        "Service Amérique, Asie et Australie",
        "Service France et Europe"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gabon-green via-gabon-green-dark to-gabon-blue">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Organigramme de la DGES
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Structure organisationnelle de la Direction Générale de l'Enseignement Supérieur
            </p>
          </motion.div>
        </div>
      </section>

      {/* Organigramme Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            
            {/* Services d'Appui */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-center text-sm font-bold text-neutral-gray-dark mb-6 uppercase tracking-wider">
                Services d'Appui
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {servicesAppui.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-gabon-blue-light to-gabon-green-light p-4 rounded-xl text-center text-sm font-medium text-neutral-black shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Direction Générale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex flex-col items-center gap-6">
                {/* DG et DG Adjoint */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gabon-green to-gabon-green-dark text-white px-8 py-6 rounded-xl text-center font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer min-w-[250px]"
                  >
                    Directeur Général
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gabon-yellow to-gabon-yellow-dark text-neutral-black px-8 py-5 rounded-xl text-center font-semibold shadow-xl hover:shadow-2xl transition-all cursor-pointer min-w-[250px]"
                  >
                    Directeur Général Adjoint
                  </motion.div>
                </div>

                {/* Services annexes */}
                <div className="flex flex-col md:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gabon-blue-light text-neutral-black px-6 py-3 rounded-lg text-center text-sm font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Secrétaire Particulier(e)
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gabon-blue-light text-neutral-black px-6 py-3 rounded-lg text-center text-sm font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Chargés d'Études
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Services Centraux Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-gabon-yellow-light via-gabon-yellow to-gabon-yellow-light text-neutral-black text-center py-4 px-6 rounded-xl font-bold text-xl mb-12 shadow-lg"
            >
              SERVICES CENTRAUX
            </motion.div>

            {/* Directions Principales */}
            <div className="grid lg:grid-cols-2 gap-8">
              {directions.map((direction, dirIndex) => (
                <motion.div
                  key={dirIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + dirIndex * 0.1 }}
                  className="bg-neutral-background rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  {/* Titre de la direction */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="bg-gradient-to-r from-gabon-blue to-gabon-blue-dark text-white p-5 rounded-xl text-center font-bold mb-5 shadow-md cursor-pointer"
                  >
                    {direction.title}
                  </motion.div>

                  {/* Services de la direction */}
                  <div className="space-y-3">
                    {direction.services.map((service, servIndex) => (
                      <motion.div
                        key={servIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + dirIndex * 0.1 + servIndex * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="bg-gradient-to-r from-gabon-green-light to-gabon-green/20 text-neutral-black p-4 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-gabon-green"
                      >
                        {service}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note de bas de page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-12 text-center text-neutral-gray-dark text-sm"
            >
              <p>Cliquez sur les éléments pour plus d'informations</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Organigramme;
