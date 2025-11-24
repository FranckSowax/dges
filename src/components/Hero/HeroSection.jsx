import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [heroConfig, setHeroConfig] = useState({
    media_type: 'video',
    media_url: 'https://res.cloudinary.com/dln7mhq4z/video/upload/v1732114938/v4_ou0bi6.mp4', // Default fallback
    title: "L'Enseignement Supérieur Gabonais",
    subtitle: "Accédez à tous les services de la Direction Générale de l'Enseignement Supérieur en quelques clics. Simple, rapide et sécurisé."
  });

  useEffect(() => {
    const fetchHeroConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_config')
          .select('*')
          .eq('section_key', 'hero_main')
          .single();

        if (data) {
          setHeroConfig(prev => ({
            ...prev,
            ...data,
            // Use fallback title/subtitle if empty in DB to avoid breaking layout
            title: data.title || prev.title,
            subtitle: data.subtitle || prev.subtitle
          }));
        }
      } catch (err) {
        console.warn('Using default hero config');
      }
    };

    fetchHeroConfig();
  }, []);

  const suggestedQuestions = [
    "Comment obtenir une bourse ?",
    "Quelles sont les universités publiques ?",
    "Comment faire une demande d'attestation ?",
    "Calendrier universitaire 2024-2025"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
    // Ici, intégration avec l'IA
  };

  return (
    <section className="relative bg-gradient-to-br from-gabon-green-light via-white to-gabon-blue-light pt-32 pb-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gabon-yellow-light rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-green-light rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-gabon-yellow" />
              <span className="text-sm font-medium text-neutral-gray-dark">
                Plateforme modernisée avec IA
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
              {heroConfig.title}{' '}
              <span className="text-gradient">à portée de clic</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-neutral-gray-dark mb-8 leading-relaxed">
              {heroConfig.subtitle}
            </p>

            {/* AI Search Bar */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <div className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                  isFocused ? 'shadow-2xl ring-2 ring-gabon-green' : ''
                }`}>
                  <div className="flex items-center px-6 py-4">
                    <Search className="w-6 h-6 text-gabon-green flex-shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                      placeholder="Posez une question à notre assistant virtuel..."
                      className="flex-1 ml-4 text-lg outline-none text-neutral-black placeholder-neutral-gray-dark"
                    />
                    <button
                      type="submit"
                      className="ml-4 bg-gabon-green text-white px-6 py-2 rounded-xl font-medium hover:bg-gabon-green-dark transition-colors flex items-center space-x-2"
                    >
                      <span>Rechercher</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Suggested Questions */}
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-gray-light p-4 z-20"
                  >
                    <p className="text-sm font-medium text-neutral-gray-dark mb-3">
                      Questions fréquentes :
                    </p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(question)}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gabon-green-light text-sm text-neutral-black transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-3xl font-bold text-gabon-green">5</p>
                <p className="text-sm text-neutral-gray-dark">Universités Publiques</p>
              </div>
              <div className="w-px h-12 bg-neutral-gray-light"></div>
              <div>
                <p className="text-3xl font-bold text-gabon-green">8</p>
                <p className="text-sm text-neutral-gray-dark">Grandes Écoles</p>
              </div>
              <div className="w-px h-12 bg-neutral-gray-light"></div>
              <div>
                <p className="text-3xl font-bold text-gabon-green">64</p>
                <p className="text-sm text-neutral-gray-dark">Établissements Privés</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Dynamic Media */}
              <div className="aspect-square bg-gradient-to-br from-gabon-green to-gabon-blue rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative group">
                {heroConfig.media_type === 'video' ? (
                  <video 
                    src={heroConfig.media_url} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                ) : (
                  <img 
                    src={heroConfig.media_url} 
                    className="w-full h-full object-cover" 
                    alt="Illustration DGES" 
                  />
                )}
                
                {/* Overlay Text (Optional) */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white p-12 backdrop-blur-sm bg-black/10 rounded-3xl border border-white/10">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-md animate-pulse-slow">
                       {heroConfig.media_type === 'video' ? <Sparkles className="w-10 h-10" /> : <Search className="w-10 h-10" />}
                    </div>
                    <p className="text-2xl font-bold mb-2">Portail DGES</p>
                    <p className="text-white/90 text-sm">Enseignement Supérieur Connecté</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 w-48"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gabon-green-light rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gabon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-gray-dark">Assistant IA</p>
                    <p className="text-sm font-bold text-neutral-black">Disponible 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 w-48"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gabon-yellow-light rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gabon-yellow" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-gray-dark">Traitement</p>
                    <p className="text-sm font-bold text-neutral-black">Rapide & Simple</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
