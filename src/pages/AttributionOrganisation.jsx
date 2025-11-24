import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Printer, ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const AttributionOrganisation = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Auto-select first document
    if (documents.length > 0) {
      setSelectedDoc(documents[0]);
    }
  }, []);

  const documents = [
    {
      id: 1,
      name: 'Attribution et Missions de la DGES',
      type: 'pdf',
      size: '2.5 MB',
      pages: 8,
      content: (
        <div>
          <h1 className="text-3xl font-bold mb-4">Attribution et Missions de la DGES</h1>
          <p className="text-gabon-green font-semibold mb-6">Direction Générale de l'Enseignement Supérieur</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Article 1 : Missions principales</h2>
          <p className="mb-4 text-justify">
            La Direction Générale de l'Enseignement Supérieur (DGES) est chargée de la conception, de la mise en œuvre et du suivi de la politique du Gouvernement en matière d'enseignement supérieur, de recherche scientifique et d'innovation technologique.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Coordination et supervision</h3>
          <p className="mb-4 text-justify">
            La DGES coordonne et supervise l'ensemble des activités liées à l'enseignement supérieur sur le territoire national. Elle assure la liaison entre le Ministère et les établissements d'enseignement supérieur publics et privés.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Élaboration des politiques</h3>
          <p className="mb-4 text-justify">
            Elle participe à l'élaboration des textes législatifs et réglementaires régissant l'enseignement supérieur, la recherche scientifique et l'innovation. Elle veille à leur application et propose les mesures d'adaptation nécessaires.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Article 2 : Attributions spécifiques</h2>
          <p className="mb-4">Dans le cadre de ses missions, la DGES exerce les attributions suivantes :</p>
          
          <ul className="list-disc pl-8 mb-6 space-y-2">
            <li>Assurer le pilotage stratégique de l'enseignement supérieur</li>
            <li>Superviser l'ensemble des établissements d'enseignement supérieur</li>
            <li>Coordonner la recherche scientifique et l'innovation technologique</li>
            <li>Gérer les bourses d'études et les programmes d'orientation</li>
            <li>Développer les partenariats internationaux</li>
            <li>Assurer le suivi qualité des formations</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      name: 'Organigramme détaillé',
      type: 'word',
      size: '1.8 MB',
      pages: 5,
      content: (
        <div>
          <h1 className="text-3xl font-bold mb-4">Organigramme détaillé de la DGES</h1>
          <p className="text-gabon-green font-semibold mb-6">Structure organisationnelle complète</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">I. DIRECTION GÉNÉRALE</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1. Cabinet du Directeur Général</h3>
          <ul className="list-disc pl-8 mb-4 space-y-1">
            <li>Directeur Général</li>
            <li>Directeur Général Adjoint</li>
            <li>Secrétaire Particulier(e)</li>
            <li>Chargés d'Études</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2. Services d'Appui</h3>
          <p className="font-semibold mb-2">Service Courrier, Archives et Documentation</p>
          <ul className="list-disc pl-8 mb-4 space-y-1">
            <li>Gestion du courrier entrant et sortant</li>
            <li>Archivage des documents administratifs</li>
            <li>Centre de documentation</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      name: 'Règlement intérieur',
      type: 'pdf',
      size: '3.2 MB',
      pages: 12,
      content: (
        <div>
          <h1 className="text-3xl font-bold mb-4">Règlement Intérieur de la DGES</h1>
          <p className="text-gabon-green font-semibold mb-6">Dispositions générales et fonctionnement</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Chapitre I : Dispositions Générales</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Article 1 : Objet du règlement</h3>
          <p className="mb-4 text-justify">
            Le présent règlement intérieur a pour objet de définir les règles de fonctionnement de la Direction Générale de l'Enseignement Supérieur ainsi que les droits et obligations de son personnel.
          </p>
        </div>
      )
    }
  ];

  const handlePrint = () => window.print();
  const handleDownload = () => {
    if (selectedDoc) {
      alert(`Téléchargement de "${selectedDoc.name}" - Fonctionnalité à implémenter`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      {/* Hero/Toolbar */}
      <section className="pt-32 pb-6 bg-gradient-to-r from-gabon-green to-gabon-blue sticky top-[88px] z-40 shadow-lg">
        <div className="container-custom">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Attribution et Organisation
              </h1>
              <p className="text-white/90 text-sm">Direction Générale de l'Enseignement Supérieur</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handlePrint} className="btn-secondary bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
              <button onClick={() => window.history.back()} className="btn-primary bg-white text-gabon-green hover:shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[350px_1fr] gap-6">
            {/* Sidebar */}
            <aside className="bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-[220px]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gabon-green" />
                Documents disponibles
              </h2>
              <div className="space-y-3">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedDoc?.id === doc.id
                        ? 'border-gabon-green bg-gabon-green-light'
                        : 'border-neutral-gray-light hover:border-gabon-green hover:bg-gabon-green-light/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-2 ${
                      doc.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {doc.type.toUpperCase()}
                    </div>
                    <p className="font-semibold text-sm mb-1">{doc.name}</p>
                    <p className="text-xs text-neutral-gray-dark">
                      {doc.size} • {doc.pages} pages
                    </p>
                  </button>
                ))}
              </div>
            </aside>

            {/* Viewer */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Toolbar */}
              <div className="bg-gradient-to-r from-neutral-background to-neutral-gray-light p-4 border-b border-neutral-gray-light flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-2">
                  <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 bg-white rounded-lg text-sm font-medium">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
                <button onClick={handleDownload} className="btn-primary bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>

              {/* Document Content */}
              <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-400px)] bg-neutral-background">
                {selectedDoc ? (
                  <motion.div
                    key={selectedDoc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                    className="bg-white shadow-2xl rounded-lg p-12 max-w-4xl mx-auto"
                  >
                    {selectedDoc.content}
                  </motion.div>
                ) : (
                  <div className="text-center py-20">
                    <FileText className="w-20 h-20 text-neutral-gray-light mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-neutral-black mb-2">Sélectionnez un document</h3>
                    <p className="text-neutral-gray-dark">Choisissez un document dans la liste de gauche</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AttributionOrganisation;
