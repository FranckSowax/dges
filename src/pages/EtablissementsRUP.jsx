import React, { useEffect } from 'react';
import Header from '../components/Navigation/Header';
import Footer from '../components/Footer/Footer';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';
import EstablishmentsList from '../components/Establishments/EstablishmentsList';

const EtablissementsRUP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <ChatbotWidget />

      <EstablishmentsList
        type="RUP"
        title="Établissements RUP"
        subtitle="Établissements Reconnus d'Utilité Publique"
        heroGradient="from-amber-600 via-orange-500 to-amber-600"
        dashboardPath="/dashboard/etablissements/rup"
      />

      <Footer />
    </div>
  );
};

export default EtablissementsRUP;
