import React from 'react';
import { motion } from 'framer-motion';

const ParallaxSection = () => {
  return (
    <section 
      className="relative h-[400px] md:h-[500px] w-full overflow-hidden"
      style={{
        backgroundImage: 'url(/replicate-prediction-txeczxb3xhrma0ctvgwtf1wqtw.jpeg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gabon-green/80 via-gabon-green/60 to-gabon-yellow/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Construisons ensemble l'avenir de l'éducation
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 drop-shadow-md">
              La Direction Générale de l'Enseignement Supérieur accompagne les étudiants gabonais 
              vers l'excellence académique et professionnelle.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default ParallaxSection;
