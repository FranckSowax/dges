import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Download, Eye, Scale, Gavel, ScrollText, Loader, X } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import { supabase } from '../supabaseClient';

const RessourcesJuridiques = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('legal_resources')
        .select('*')
        .order('category', { ascending: true })
        .order('publication_date', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.warn('Supabase fetch error:', error.message);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryKey = (category) => {
    if (category === 'Loi') return 'lois';
    if (category === 'Décret') return 'decrets';
    if (category === 'Arrêté') return 'arretes';
    return 'lois';
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryKey = getCategoryKey(resource.category);
    const matchesFilter = activeFilter === 'all' || categoryKey === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilteredByCategory = (categoryKey) => {
    return filteredResources.filter(resource => getCategoryKey(resource.category) === categoryKey);
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') return '📄';
    if (['doc', 'docx'].includes(fileType)) return '📝';
    return '📁';
  };

  const canPreviewInBrowser = (fileType) => {
    return fileType === 'pdf';
  };

  const handleView = (resource) => {
    if (resource.file_url) {
      setPreviewDoc(resource);
    } else {
      alert(`Aucun fichier disponible pour : ${resource.title}`);
    }
  };

  const handleDownload = (resource) => {
    if (resource.file_url) {
      const link = document.createElement('a');
      link.href = resource.file_url;
      link.download = resource.file_name || `${resource.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Aucun fichier disponible pour : ${resource.title}`);
    }
  };

  const stats = {
    lois: resources.filter(r => r.category === 'Loi').length,
    decrets: resources.filter(r => r.category === 'Décret').length,
    arretes: resources.filter(r => r.category === 'Arrêté').length,
    total: resources.length
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Loi': return Scale;
      case 'Décret': return Gavel;
      case 'Arrêté': return ScrollText;
      default: return FileText;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Loi': return 'from-blue-600 to-blue-700';
      case 'Décret': return 'from-emerald-600 to-emerald-700';
      case 'Arrêté': return 'from-amber-600 to-amber-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case 'Loi': return 'bg-blue-100 text-blue-700';
      case 'Décret': return 'bg-emerald-100 text-emerald-700';
      case 'Arrêté': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const DocumentCard = ({ resource }) => {
    const IconComponent = getCategoryIcon(resource.category);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
      >
        <div className={`p-5 bg-gradient-to-br ${getCategoryColor(resource.category)}`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-white/20 text-white`}>
                {resource.category}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {resource.reference || resource.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-sm text-neutral-gray-dark line-clamp-3">
            {resource.description || resource.title}
          </p>
          {resource.publication_date && (
            <div className="flex items-center gap-2 text-xs text-neutral-gray-dark">
              <span>📅 {new Date(resource.publication_date).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
          {resource.file_size && (
            <div className="text-xs text-neutral-gray-dark">
              📄 {resource.file_size}
            </div>
          )}
        </div>

        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={() => handleView(resource)}
            disabled={!resource.file_url}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              resource.file_url 
                ? 'bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white hover:shadow-lg' 
                : 'bg-neutral-gray-light text-neutral-gray-dark cursor-not-allowed'
            }`}
          >
            <Eye className="w-4 h-4" />
            Visualiser
          </button>
          <button
            onClick={() => handleDownload(resource)}
            disabled={!resource.file_url}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all ${
              resource.file_url 
                ? 'bg-neutral-background text-neutral-black border-neutral-gray-light hover:border-gabon-green' 
                : 'bg-neutral-gray-light text-neutral-gray-dark border-neutral-gray-light cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
        </div>
      </motion.div>
    );
  };

  const Section = ({ title, icon: Icon, count, resources: sectionResources, show, color }) => {
    if (!show) return null;
    
    return (
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-black">{title}</h2>
          <span className="ml-auto px-4 py-1.5 bg-gabon-green/10 text-gabon-green rounded-full text-sm font-bold">
            {count}
          </span>
        </div>

        {sectionResources.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center shadow-md">
            <div className="text-6xl mb-4 opacity-30">📄</div>
            <h3 className="text-xl font-semibold text-neutral-black mb-2">Aucun document disponible</h3>
            <p className="text-neutral-gray-dark">Cette section sera mise à jour prochainement</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionResources.map(resource => (
              <DocumentCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-gabon-green via-gabon-green-dark to-gabon-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Ressources Juridiques
            </h1>
            <p className="text-xl opacity-95 max-w-3xl mx-auto">
              Trouvez ci-dessous nos lois, décrets, arrêtés à visualiser ou à télécharger
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: stats.lois, label: 'Lois', color: 'blue' },
              { number: stats.decrets, label: 'Décrets', color: 'emerald' },
              { number: stats.arretes, label: 'Arrêtés', color: 'amber' },
              { number: stats.total, label: 'Total Documents', color: 'green' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center shadow-lg hover:-translate-y-1 transition-transform"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-neutral-gray-dark font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher une loi, un décret, un arrêté..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-neutral-gray-light rounded-xl text-base focus:outline-none focus:border-gabon-green transition-colors"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'lois', label: 'Lois' },
                { id: 'decrets', label: 'Décrets' },
                { id: 'arretes', label: 'Arrêtés' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gabon-green text-white'
                      : 'bg-neutral-background text-neutral-gray-dark border-2 border-neutral-gray-light hover:border-gabon-green'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documents Sections */}
      <section className="py-8 pb-20">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader className="w-10 h-10 text-gabon-green animate-spin" />
            </div>
          ) : (
            <>
              <Section
                title="Lois"
                icon={Scale}
                count={getFilteredByCategory('lois').length}
                resources={getFilteredByCategory('lois')}
                show={activeFilter === 'all' || activeFilter === 'lois'}
                color="from-blue-600 to-blue-700"
              />

              <Section
                title="Décrets"
                icon={Gavel}
                count={getFilteredByCategory('decrets').length}
                resources={getFilteredByCategory('decrets')}
                show={activeFilter === 'all' || activeFilter === 'decrets'}
                color="from-emerald-600 to-emerald-700"
              />

              <Section
                title="Arrêtés"
                icon={ScrollText}
                count={getFilteredByCategory('arretes').length}
                resources={getFilteredByCategory('arretes')}
                show={activeFilter === 'all' || activeFilter === 'arretes'}
                color="from-amber-600 to-amber-700"
              />
            </>
          )}
        </div>
      </section>

      <Footer />

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-4 border-b bg-gradient-to-r ${getCategoryColor(previewDoc.category)} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{getFileIcon(previewDoc.file_type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">{previewDoc.reference || previewDoc.title}</h3>
                    <p className="text-sm text-white/70">
                      {previewDoc.file_name || 'Document'} • {previewDoc.file_size || 'Taille inconnue'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(previewDoc)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </button>
                  <a
                    href={previewDoc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 bg-neutral-gray-light overflow-hidden">
                {canPreviewInBrowser(previewDoc.file_type) ? (
                  <iframe
                    src={`${previewDoc.file_url}#toolbar=1&navpanes=0`}
                    className="w-full h-full border-0"
                    title={previewDoc.title}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
                      <span className="text-5xl">{getFileIcon(previewDoc.file_type)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-black mb-2">
                      Aperçu non disponible
                    </h3>
                    <p className="text-neutral-gray-dark mb-6 max-w-md">
                      Les fichiers {previewDoc.file_type?.toUpperCase() || 'de ce type'} ne peuvent pas être prévisualisés directement dans le navigateur.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(previewDoc)}
                        className="px-6 py-3 bg-gabon-green text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-gabon-green-dark transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger le document
                      </button>
                      <a
                        href={previewDoc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-neutral-black text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-neutral-gray-dark transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                        Ouvrir avec une app
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RessourcesJuridiques;
