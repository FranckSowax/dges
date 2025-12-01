import React, { useEffect } from 'react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import EstablishmentsList from '../components/Establishments/EstablishmentsList';

const EtablissementsPrives = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      <EstablishmentsList
        type="Privé"
        title="Établissements Privés"
        subtitle="Établissements d'enseignement supérieur privé au Gabon"
        heroGradient="from-emerald-600 via-teal-500 to-emerald-600"
        dashboardPath="/dashboard/etablissements/prives"
      />

      <Footer />
    </div>
  );
};

export default EtablissementsPrives;
