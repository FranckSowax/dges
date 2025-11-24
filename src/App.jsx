import React from 'react';
import Header from './components/Navigation/Header';
import HeroSection from './components/Hero/HeroSection';
import ServicesGrid from './components/Services/ServicesGrid';
import NewsSection from './components/News/NewsSection';
import StatsSection from './components/Stats/StatsSection';
import PartnersCarousel from './components/Partners/PartnersCarousel';
import AIChatCTA from './components/AI/AIChatCTA';
import Footer from './components/Footer/Footer';
import ChatBot from './components/Chat/ChatBot';
import { ChatProvider } from './context/ChatContext';

function AppContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
        <ServicesGrid />
        <StatsSection />
        <PartnersCarousel />
        <AIChatCTA />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;
