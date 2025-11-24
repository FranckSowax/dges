import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Calendar, Download, Eye, GraduationCap, Building2 } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const ConventionsCooperation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const conventions = [
    {
      id: 1,
      title: "Convention de collaboration entre l'Université de Dschang et l'Université des Sciences et Techniques de Masuku",
      category: "conventions",
      date: "2024",
      size: "2.5 MB"
    },
    {
      id: 2,
      title: "Convention de coopération dans le domaine de la formation professionnelle",
      category: "conventions",
      date: "2024",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Convention de coopération entre ENSET et l'Université de Douala",
      category: "conventions",
      date: "2023",
      size: "2.1 MB"
    },
    {
      id: 4,
      title: "Convention de coopération entre l'École Normale Supérieure d'Enseignement Technique (ENSET) et l'Université de Douala (Cameroun)",
      category: "conventions",
      date: "2023",
      size: "2.3 MB"
    },
    {
      id: 5,
      title: "Convention de partenariat entre l'Institut National des Sciences de Gestion et Petro Gabon",
      category: "conventions",
      date: "2024",
      size: "1.9 MB"
    },
    {
      id: 6,
      title: "Convention de partenariat entre le Ministère des Affaires Étrangères de la Francophonie et de l'Intégration Régionale et l'Institut des Sciences de Gestion",
      category: "conventions",
      date: "2024",
      size: "3.1 MB"
    },
    {
      id: 7,
      title: "Convention École Normale Supérieure de Libreville - Faculté des Sciences (USTM) de Franceville",
      category: "conventions",
      date: "2023",
      size: "2.2 MB"
    },
    {
      id: 8,
      title: "Convention portant création, organisation et fonctionnement de l'EAMAU",
      category: "conventions",
      date: "2022",
      size: "4.5 MB"
    },
    {
      id: 9,
      title: "Convention portant création, organisation et fonctionnement de l'École Africaine des Métiers de l'Architecture et de l'Urbanisme (EAMAU)",
      category: "conventions",
      date: "2022",
      size: "4.2 MB"
    },
    {
      id: 10,
      title: "Convention spécifique de partenariat et de coopération entre l'Institut International de Berthe et Jean Universiapolis - Université Internationale d'Agadir (Maroc)",
      category: "conventions",
      date: "2024",
      size: "2.7 MB"
    }
  ];

  const universitesAccords = [
    {
      id: 11,
      title: "Accord de coopération entre l'UOB de Libreville et l'Université de Ngaoundéré du Cameroun",
      category: "universites",
      date: "2023",
      size: "1.6 MB"
    },
    {
      id: 12,
      title: "Accord de coopération entre l'Université de Ngaoundéré et l'Université Omar Bongo de Libreville",
      category: "universites",
      date: "2023",
      size: "1.5 MB"
    },
    {
      id: 13,
      title: "Accord-cadre de coopération scientifique et pédagogique entre l'Université Omar Bongo et l'Université d'Abomey-Calavi (Bénin)",
      category: "universites",
      date: "2024",
      size: "2.0 MB"
    }
  ];

  const institutsAccords = [
    {
      id: 14,
      title: "Accord-cadre entre l'École Normale Supérieure de l'Enseignement Technique de Libreville et l'Université Cheikh Anta Diop de Dakar",
      category: "instituts",
      date: "2023",
      size: "1.8 MB"
    },
    {
      id: 15,
      title: "Accord-cadre de coopération entre l'Université Cheikh Anta Diop de Dakar et l'ENSET Libreville",
      category: "instituts",
      date: "2023",
      size: "1.7 MB"
    }
  ];

  const allDocuments = [...conventions, ...universitesAccords, ...institutsAccords];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || doc.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilteredByCategory = (category) => {
    return filteredDocuments.filter(doc => doc.category === category);
  };

  const handleView = (doc) => {
    alert(`Visualisation de : ${doc.title}\n\nCette fonctionnalité ouvrira le PDF dans une visionneuse intégrée.`);
  };

  const handleDownload = (doc) => {
    alert(`Téléchargement de : ${doc.title}\n\nFichier : ${doc.size}`);
  };

  const DocumentCard = ({ doc }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gabon-blue relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gabon-blue to-gabon-blue-dark opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-7 h-7 text-yellow-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-semibold text-neutral-black leading-snug mb-2">
            {doc.title}
          </h3>
          <div className="flex gap-4 text-sm text-neutral-gray-dark">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {doc.date}
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {doc.size}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-5 border-t border-neutral-gray-light">
        <button
          onClick={() => handleView(doc)}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-gabon-blue to-gabon-blue-dark text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Eye className="w-4 h-4" />
          Visualiser
        </button>
        <button
          onClick={() => handleDownload(doc)}
          className="flex-1 py-2.5 px-4 bg-neutral-background text-neutral-black rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 border-neutral-gray-light hover:border-gabon-blue transition-all"
        >
          <Download className="w-4 h-4" />
          Télécharger
        </button>
      </div>
    </motion.div>
  );

  const Section = ({ title, icon: Icon, count, documents, show }) => {
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

        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center shadow-md">
            <div className="text-6xl mb-4 opacity-30">📄</div>
            <h3 className="text-xl font-semibold text-neutral-black mb-2">Aucun document disponible</h3>
            <p className="text-neutral-gray-dark">Cette section sera mise à jour prochainement</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
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
              { number: allDocuments.length, label: 'Conventions' },
              { number: universitesAccords.length, label: 'Accords Universités' },
              { number: institutsAccords.length, label: 'Accords Instituts' },
              { number: '5+', label: 'Pays Partenaires' }
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
          <Section
            title="Conventions de Coopération"
            icon={FileText}
            count={getFilteredByCategory('conventions').length}
            documents={getFilteredByCategory('conventions')}
            show={activeFilter === 'all' || activeFilter === 'conventions'}
          />

          <Section
            title="Accords-Cadres Universités"
            icon={GraduationCap}
            count={getFilteredByCategory('universites').length}
            documents={getFilteredByCategory('universites')}
            show={activeFilter === 'all' || activeFilter === 'universites'}
          />

          <Section
            title="Accords-Cadres Instituts & Grandes Écoles"
            icon={Building2}
            count={getFilteredByCategory('instituts').length}
            documents={getFilteredByCategory('instituts')}
            show={activeFilter === 'all' || activeFilter === 'instituts'}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConventionsCooperation;
