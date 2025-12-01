import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const defaultPartners = [
  { id: 1, name: 'Université Omar Bongo', acronym: 'UOB', logo_url: null },
  { id: 2, name: 'Université des Sciences et Techniques de Masuku', acronym: 'USTM', logo_url: null },
  { id: 3, name: 'École Normale Supérieure', acronym: 'ENS', logo_url: null },
  { id: 4, name: 'École Polytechnique de Masuku', acronym: 'EPM', logo_url: null },
  { id: 5, name: 'Institut Supérieur de Technologie', acronym: 'IST', logo_url: null },
  { id: 6, name: 'Université des Sciences de la Santé', acronym: 'USS', logo_url: null },
  { id: 7, name: 'École Nationale des Eaux et Forêts', acronym: 'ENEF', logo_url: null },
  { id: 8, name: 'Institut Africain d\'Informatique', acronym: 'IAI', logo_url: null }
];

const PartnersCarousel = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('establishments')
          .select('id, name, acronym, logo_url, type')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(8);

        if (!error && data && data.length > 0) {
          setPartners(data);
        } else {
          // Fallback aux données par défaut
          setPartners(defaultPartners);
        }
      } catch (err) {
        console.error('Erreur chargement établissements:', err);
        setPartners(defaultPartners);
      } finally {
        setLoading(false);
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
              className="bg-white rounded-card p-6 flex items-center justify-center hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                {partner.logo_url ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border-2 border-neutral-gray-light">
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{partner.acronym}</span>
                  </div>
                )}
                <p className="text-xs text-neutral-gray-dark font-medium line-clamp-2">{partner.name}</p>
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
