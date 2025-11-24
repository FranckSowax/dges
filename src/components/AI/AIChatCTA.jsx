import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const AIChatCTA = () => {
  const { openChat } = useChat();
  
  const exampleQuestions = [
    "Comment obtenir une bourse d'études ?",
    "Quels sont les établissements publics ?",
    "Procédure d'inscription universitaire",
    "Calendrier académique 2024-2025"
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Réponses instantanées",
      description: "24/7 disponible"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Intelligence artificielle",
      description: "Alimenté par l'IA"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Assistance personnalisée",
      description: "Adapté à vos besoins"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-gabon-green via-gabon-green-dark to-gabon-blue relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gabon-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gabon-blue/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gabon-yellow" />
              <span className="text-xs sm:text-sm font-medium text-white">
                Nouveau : Assistant IA
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Besoin d'aide ?<br />
              Discutez avec notre<br />
              <span className="text-gabon-yellow">Assistant Virtuel</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Notre chatbot intelligent est là pour répondre à toutes vos questions sur l'enseignement supérieur au Gabon. 
              Obtenez des réponses instantanées, 24h/24 et 7j/7.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gabon-yellow rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    {React.cloneElement(feature.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-0.5 sm:mb-1">{feature.title}</p>
                  <p className="text-[10px] sm:text-xs text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={openChat}
              className="group bg-white text-gabon-green px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gabon-yellow hover:text-neutral-black transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto active:scale-95"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Démarrer la conversation</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Right Content - Example Questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 lg:mt-0"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gabon-yellow" />
                <span>Exemples de questions</span>
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {exampleQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    onClick={openChat}
                    className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 group border border-white/10 hover:border-gabon-yellow active:scale-95"
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gabon-yellow flex-shrink-0 mt-0.5" />
                      <p className="text-white text-xs sm:text-sm leading-relaxed group-hover:text-gabon-yellow transition-colors">
                        {question}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                <p className="text-white/70 text-xs sm:text-sm text-center">
                  💡 Posez n'importe quelle question sur l'enseignement supérieur
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIChatCTA;
