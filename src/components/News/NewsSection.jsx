import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Récupération des actualités depuis Supabase
      // Si la table est vide, on utilisera des données par défaut pour la démo
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      if (data && data.length > 0) {
        setNews(data);
      } else {
        // Données de repli si la base est vide
        setNews([
          {
            id: 1,
            title: 'Lancement de la campagne de bourses 2024',
            excerpt: 'Les demandes de bourses nationales et internationales sont ouvertes jusqu\'au 30 décembre. Préparez vos dossiers dès maintenant.',
            published_at: new Date().toISOString(),
            category: 'Bourses',
            image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            title: 'Nouveau calendrier académique disponible',
            excerpt: 'Le calendrier de l\'année universitaire 2024-2025 a été validé par le ministère. Consultez les dates clés des examens et vacances.',
            published_at: new Date(Date.now() - 86400000 * 5).toISOString(), // Il y a 5 jours
            category: 'Scolarité',
            image_url: 'https://images.unsplash.com/photo-1506784335131-d6959de13526?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 3,
            title: 'Forum de l\'Orientation : Édition 2024',
            excerpt: 'Venez rencontrer les représentants des grandes écoles et universités gabonaises au Jardin Botanique de Libreville.',
            published_at: new Date(Date.now() - 86400000 * 12).toISOString(), // Il y a 12 jours
            category: 'Événement',
            image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="section-spacing bg-neutral-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-neutral-black mb-4">
              Actualités Récentes
            </h2>
            <p className="text-xl text-neutral-gray-dark max-w-2xl">
              Restez informé des dernières nouvelles de l'enseignement supérieur
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center space-x-2 text-gabon-green font-medium hover:text-gabon-green-dark transition-colors"
          >
            <span>Toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 text-gabon-green animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={item.image_url || 'https://via.placeholder.com/800x400?text=DGES+Gabon'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-gabon-green text-white text-xs font-bold rounded-full">
                      {item.category || 'Actualité'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-neutral-gray-dark text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(item.published_at)}</time>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-black mb-3 line-clamp-2 group-hover:text-gabon-green transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-gray-dark mb-4 line-clamp-3 text-sm leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center text-gabon-green font-medium text-sm group-hover:translate-x-2 transition-transform">
                    <span>Lire la suite</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <button className="btn-secondary w-full">
            Toutes les actualités
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
