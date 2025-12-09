import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Search, Filter, X, Loader, Newspaper, Tag } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import { supabase } from '../supabaseClient';

const Actualites = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      setNews([]);
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

  // Extraire les catégories uniques
  const categories = ['all', ...new Set(news.map(item => item.category).filter(Boolean))];

  // Filtrer les actualités
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const stats = {
    total: news.length,
    thisMonth: news.filter(item => {
      const date = new Date(item.published_at);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    categories: categories.length - 1
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gabon-green via-gabon-green-dark to-gabon-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-yellow rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-5 h-5" />
              <span className="font-medium">Actualités DGES</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Actualités & Événements
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Restez informé des dernières nouvelles, événements et annonces de la Direction Générale de l'Enseignement Supérieur
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-white/70">Articles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
              <p className="text-sm text-white/70">Ce mois</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{stats.categories}</p>
              <p className="text-sm text-white/70">Catégories</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-gray-light sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-background rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-5 h-5 text-neutral-gray-dark flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-gabon-green text-white'
                      : 'bg-neutral-background text-neutral-gray-dark hover:bg-gabon-green-light hover:text-gabon-green'
                  }`}
                >
                  {category === 'all' ? 'Toutes' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader className="w-12 h-12 text-gabon-green animate-spin mb-4" />
              <p className="text-neutral-gray-dark">Chargement des actualités...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-neutral-gray-light mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-black mb-2">Aucun article trouvé</h3>
              <p className="text-neutral-gray-dark">
                {searchTerm ? 'Essayez avec d\'autres termes de recherche' : 'Aucune actualité disponible pour le moment'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-neutral-gray-dark mb-6">
                {filteredNews.length} article{filteredNews.length > 1 ? 's' : ''} trouvé{filteredNews.length > 1 ? 's' : ''}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedArticle(item)}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gabon-green to-gabon-blue flex items-center justify-center">
                          <Newspaper className="w-16 h-16 text-white/30" />
                        </div>
                      )}
                      {item.category && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1.5 bg-gabon-green text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-neutral-gray-dark text-sm mb-3">
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
            </>
          )}
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative h-64 sm:h-80 shrink-0">
                {selectedArticle.image_url ? (
                  <img
                    src={selectedArticle.image_url}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gabon-green to-gabon-blue flex items-center justify-center">
                    <Newspaper className="w-24 h-24 text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {selectedArticle.category && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gabon-green text-xs font-bold rounded-full mb-3">
                      <Tag className="w-3 h-3" />
                      {selectedArticle.category}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                    {selectedArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(selectedArticle.published_at)}</time>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="prose max-w-none">
                  <p className="text-lg font-medium text-neutral-black mb-6 leading-relaxed">
                    {selectedArticle.excerpt}
                  </p>
                  <div className="text-neutral-gray-dark whitespace-pre-wrap leading-relaxed">
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

      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Actualites;
