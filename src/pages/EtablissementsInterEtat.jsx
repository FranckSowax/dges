import React, { useEffect } from 'react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import EstablishmentsList from '../components/Establishments/EstablishmentsList';

const EtablissementsInterEtat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      <EstablishmentsList
        type="Inter-État"
        title="Établissements Inter-État"
        subtitle="Établissements d'enseignement supérieur inter-étatiques"
        heroGradient="from-purple-600 via-indigo-500 to-purple-600"
        dashboardPath="/dashboard/etablissements/inter-etat"
      />

      <Footer />
    </div>
  );
};

export default EtablissementsInterEtat;
