import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Loader, X } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

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

      setNews(data || []);
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
                onClick={() => setSelectedArticle(item)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-gabon-green text-white text-xs font-bold rounded-full">
                      {item.category}
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

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-gabon-green text-xs font-bold rounded-full mb-3">
                    {selectedArticle.category || 'Actualité'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                    {selectedArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(selectedArticle.published_at)}</time>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="prose max-w-none text-neutral-gray-dark">
                  <p className="text-lg font-medium text-neutral-black mb-6 leading-relaxed">
                    {selectedArticle.excerpt}
                  </p>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {selectedArticle.content || "Contenu de l'article non disponible."}
                  </div>
                </div>

                {/* Gallery Section */}
                {selectedArticle.gallery_images && selectedArticle.gallery_images.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-neutral-gray-light">
                    <h4 className="text-xl font-bold text-neutral-black mb-6">Galerie Photos</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedArticle.gallery_images.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-neutral-background group cursor-pointer">
                          <img
                            src={img}
                            alt={`Galerie ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsSection;
