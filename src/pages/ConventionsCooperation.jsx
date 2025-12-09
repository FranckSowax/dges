import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Calendar, Download, Eye, GraduationCap, Building2, Globe, Loader, X } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import { supabase } from '../supabaseClient';

const ConventionsCooperation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Mock data fallback
  const mockAgreements = [
    { id: 'mock-1', title: "Convention de collaboration entre l'Université de Dschang et l'USTM", category: "Convention", partner_country: "Cameroun", partner_institution: "Université de Dschang", signing_date: "2024-03-15", file_size: "2.5 MB" },
    { id: 'mock-2', title: "Convention de coopération dans le domaine de la formation professionnelle", category: "Convention", partner_country: "France", partner_institution: "Ministère de l'Éducation", signing_date: "2024-01-20", file_size: "1.8 MB" },
    { id: 'mock-3', title: "Convention de coopération ENSET - Université de Douala", category: "Convention", partner_country: "Cameroun", partner_institution: "Université de Douala", signing_date: "2023-09-10", file_size: "2.1 MB" },
    { id: 'mock-4', title: "Convention de partenariat INSG - Petro Gabon", category: "Convention", partner_country: "Gabon", partner_institution: "Petro Gabon", signing_date: "2024-02-15", file_size: "1.9 MB" },
    { id: 'mock-5', title: "Convention portant création de l'EAMAU", category: "Convention", partner_country: "Multi-pays", partner_institution: "EAMAU", signing_date: "2022-06-01", file_size: "4.5 MB" },
    { id: 'mock-6', title: "Accord de coopération UOB - Université de Ngaoundéré", category: "Accord Université", partner_country: "Cameroun", partner_institution: "Université de Ngaoundéré", signing_date: "2023-05-20", file_size: "1.6 MB" },
    { id: 'mock-7', title: "Accord-cadre UOB - Université d'Abomey-Calavi", category: "Accord Université", partner_country: "Bénin", partner_institution: "Université d'Abomey-Calavi", signing_date: "2024-01-10", file_size: "2.0 MB" },
    { id: 'mock-8', title: "Accord-cadre ENSET - Université Cheikh Anta Diop", category: "Accord Institut", partner_country: "Sénégal", partner_institution: "UCAD Dakar", signing_date: "2023-09-20", file_size: "1.8 MB" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cooperation_agreements')
        .select('*')
        .order('signing_date', { ascending: false });

      if (error) throw error;
      setAgreements(data && data.length > 0 ? data : mockAgreements);
    } catch (error) {
      console.warn('Supabase fetch error (using mock data):', error.message);
      setAgreements(mockAgreements);
    } finally {
      setLoading(false);
    }
  };

  // Map categories for filtering
  const getCategoryKey = (category) => {
    if (category === 'Convention') return 'conventions';
    if (category === 'Accord Université') return 'universites';
    if (category === 'Accord Institut') return 'instituts';
    return 'conventions';
  };

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.partner_country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.partner_institution?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryKey = getCategoryKey(agreement.category);
    const matchesFilter = activeFilter === 'all' || categoryKey === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilteredByCategory = (categoryKey) => {
    return filteredAgreements.filter(agreement => getCategoryKey(agreement.category) === categoryKey);
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') return '📄';
    if (['doc', 'docx'].includes(fileType)) return '📝';
    return '📁';
  };

  // Check if file can be previewed in browser
  const canPreviewInBrowser = (fileType) => {
    return fileType === 'pdf';
  };

  const handleView = (agreement) => {
    if (agreement.file_url) {
      setPreviewDoc(agreement);
    } else {
      alert(`Aucun fichier disponible pour : ${agreement.title}`);
    }
  };

  const handleDownload = (agreement) => {
    if (agreement.file_url) {
      const link = document.createElement('a');
      link.href = agreement.file_url;
      link.download = agreement.file_name || `${agreement.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Aucun fichier disponible pour : ${agreement.title}`);
    }
  };

  // Stats
  const stats = {
    conventions: agreements.filter(a => a.category === 'Convention').length,
    universites: agreements.filter(a => a.category === 'Accord Université').length,
    instituts: agreements.filter(a => a.category === 'Accord Institut').length,
    countries: [...new Set(agreements.map(a => a.partner_country).filter(Boolean))].length
  };

  const DocumentCard = ({ agreement }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
    >
      {/* Card Header with gradient */}
      <div className="relative p-6 bg-gradient-to-br from-gabon-blue/10 to-gabon-blue/5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gabon-blue to-gabon-blue-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
              agreement.category === 'Convention' ? 'bg-blue-100 text-blue-700' :
              agreement.category === 'Accord Université' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {agreement.category}
            </span>
            <h3 className="text-base font-bold text-neutral-black leading-snug line-clamp-2">
              {agreement.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 pt-4 space-y-3">
        {agreement.partner_institution && (
          <div className="flex items-center gap-2 text-sm text-neutral-gray-dark">
            <Globe className="w-4 h-4 text-gabon-blue" />
            <span>{agreement.partner_institution}</span>
          </div>
        )}
        {agreement.partner_country && (
          <div className="flex items-center gap-2 text-sm text-neutral-gray-dark">
            <span>🌍</span>
            <span>{agreement.partner_country}</span>
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-neutral-gray-dark">
          {agreement.signing_date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(agreement.signing_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
            </div>
          )}
          {agreement.file_size && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              {agreement.file_size}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex gap-3 p-6 pt-0">
        <button
          onClick={() => handleView(agreement)}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-gabon-blue to-gabon-blue-dark text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Eye className="w-4 h-4" />
          Visualiser
        </button>
        <button
          onClick={() => handleDownload(agreement)}
          className="flex-1 py-3 px-4 bg-neutral-background text-neutral-black rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 border-neutral-gray-light hover:border-gabon-blue transition-all"
        >
          <Download className="w-4 h-4" />
          Télécharger
        </button>
      </div>
    </motion.div>
  );

  const Section = ({ title, icon: Icon, count, agreements: sectionAgreements, show }) => {
    if (!show) return null;
    
    return (
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-gabon-blue to-gabon-blue-dark rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-black">{title}</h2>
          <span className="ml-auto px-4 py-1.5 bg-blue-50 text-gabon-blue rounded-full text-sm font-bold">
            {count}
          </span>
        </div>

        {sectionAgreements.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center shadow-md">
            <div className="text-6xl mb-4 opacity-30">📄</div>
            <h3 className="text-xl font-semibold text-neutral-black mb-2">Aucun document disponible</h3>
            <p className="text-neutral-gray-dark">Cette section sera mise à jour prochainement</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionAgreements.map(agreement => (
              <DocumentCard key={agreement.id} agreement={agreement} />
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
      <section className="pt-32 pb-20 bg-gradient-to-r from-gabon-blue via-gabon-blue-dark to-gabon-blue relative overflow-hidden">
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
              Conventions de Coopération
            </h1>
            <p className="text-xl opacity-95 max-w-3xl mx-auto">
              Trouvez ci-dessous nos conventions de coopération internationale à visualiser ou à télécharger
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: stats.conventions, label: 'Conventions' },
              { number: stats.universites, label: 'Accords Universités' },
              { number: stats.instituts, label: 'Accords Instituts' },
              { number: stats.countries || '5+', label: 'Pays Partenaires' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center shadow-lg hover:-translate-y-1 transition-transform"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-gabon-blue to-gabon-blue-dark bg-clip-text text-transparent mb-2">
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
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher une convention..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-neutral-gray-light rounded-xl text-base focus:outline-none focus:border-gabon-blue transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'all', label: 'Toutes' },
                { id: 'conventions', label: 'Conventions' },
                { id: 'universites', label: 'Universités' },
                { id: 'instituts', label: 'Instituts' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gabon-blue text-white'
                      : 'bg-neutral-background text-neutral-gray-dark border-2 border-neutral-gray-light hover:border-gabon-blue'
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
              <Loader className="w-10 h-10 text-gabon-blue animate-spin" />
            </div>
          ) : (
            <>
              <Section
                title="Conventions de Coopération"
                icon={FileText}
                count={getFilteredByCategory('conventions').length}
                agreements={getFilteredByCategory('conventions')}
                show={activeFilter === 'all' || activeFilter === 'conventions'}
              />

              <Section
                title="Accords-Cadres Universités"
                icon={GraduationCap}
                count={getFilteredByCategory('universites').length}
                agreements={getFilteredByCategory('universites')}
                show={activeFilter === 'all' || activeFilter === 'universites'}
              />

              <Section
                title="Accords-Cadres Instituts & Grandes Écoles"
                icon={Building2}
                count={getFilteredByCategory('instituts').length}
                agreements={getFilteredByCategory('instituts')}
                show={activeFilter === 'all' || activeFilter === 'instituts'}
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
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gabon-blue to-gabon-blue-dark text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{getFileIcon(previewDoc.file_type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">{previewDoc.title}</h3>
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
                        className="px-6 py-3 bg-gabon-blue text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
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

export default ConventionsCooperation;
