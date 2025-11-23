import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const defaultPartners = [
  { id: 1, name: 'Université Omar Bongo', logo: 'UOB' },
  { id: 2, name: 'Université des Sciences et Techniques de Masuku', logo: 'USTM' },
  { id: 3, name: 'École Normale Supérieure', logo: 'ENS' },
  { id: 4, name: 'École Polytechnique de Masuku', logo: 'EPM' },
  { id: 5, name: 'Institut Supérieur de Technologie', logo: 'IST' },
  { id: 6, name: 'Université des Sciences de la Santé', logo: 'USS' },
  { id: 7, name: 'École Nationale des Eaux et Forêts', logo: 'ENEF' },
  { id: 8, name: 'Institut Africain d\'Informatique', logo: 'IAI' }
];

const PartnersCarousel = () => {
  const [partners, setPartners] = useState(defaultPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*');

        if (!error && data && data.length > 0) {
          // Adapter le format des données si nécessaire
          const formattedPartners = data.map(p => ({
            id: p.id,
            name: p.name,
            logo: p.logo_url || p.name.substring(0, 3).toUpperCase() // Fallback si pas d'image
          }));
          setPartners(formattedPartners);
        }
      } catch (err) {
        console.error('Erreur chargement partenaires:', err);
        // On garde les partenaires par défaut en cas d'erreur
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="section-spacing bg-neutral-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-black mb-4">
              Nos Établissements Partenaires
            </h2>
            <p className="text-xl text-neutral-gray-dark max-w-2xl mx-auto">
              Un réseau d'excellence pour votre réussite académique
            </p>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-card p-8 flex items-center justify-center hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{partner.logo}</span>
                </div>
                <p className="text-xs text-neutral-gray-dark font-medium">{partner.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button className="btn-primary">
            Voir tous les établissements
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
