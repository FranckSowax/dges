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
      <div className="absolute top-0 right-0 w-96 h-96 bg-gabon-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-blue/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gabon-yellow" />
              <span className="text-sm font-medium text-white">
                Nouveau : Assistant IA
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Besoin d'aide ?<br />
              Discutez avec notre<br />
              <span className="text-gabon-yellow">Assistant Virtuel</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Notre chatbot intelligent est là pour répondre à toutes vos questions sur l'enseignement supérieur au Gabon. 
              Obtenez des réponses instantanées, 24h/24 et 7j/7.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="w-10 h-10 bg-gabon-yellow rounded-lg flex items-center justify-center mx-auto mb-2">
                    {feature.icon}
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{feature.title}</p>
                  <p className="text-xs text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={openChat}
              className="group bg-white text-gabon-green px-8 py-4 rounded-full font-bold text-lg hover:bg-gabon-yellow hover:text-neutral-black transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center space-x-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Démarrer la conversation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Right Content - Example Questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-gabon-yellow" />
                <span>Exemples de questions</span>
              </h3>

              <div className="space-y-4">
                {exampleQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    onClick={openChat}
                    className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group border border-white/10 hover:border-gabon-yellow"
                  >
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-gabon-yellow flex-shrink-0 mt-0.5" />
                      <p className="text-white text-sm leading-relaxed group-hover:text-gabon-yellow transition-colors">
                        {question}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/70 text-sm text-center">
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
