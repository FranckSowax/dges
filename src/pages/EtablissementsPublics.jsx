import React, { useEffect } from 'react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import EstablishmentsList from '../components/Establishments/EstablishmentsList';

const EtablissementsPublics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      <EstablishmentsList
        type="Public"
        title="Établissements Publics"
        subtitle="Établissements d'enseignement supérieur public au Gabon"
        heroGradient="from-gabon-green via-gabon-blue to-gabon-green"
        dashboardPath="/dashboard/etablissements/publics"
      />

      <Footer />
    </div>
  );
};

export default EtablissementsPublics;
