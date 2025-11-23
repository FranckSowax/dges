import React from 'react';
import Header from './components/Navigation/Header';
import HeroSection from './components/Hero/HeroSection';
import ServicesGrid from './components/Services/ServicesGrid';
import StatsSection from './components/Stats/StatsSection';
import PartnersCarousel from './components/Partners/PartnersCarousel';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Services Grid */}
        <ServicesGrid />

        {/* News Section */}
        <NewsSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Partners Carousel */}
        <PartnersCarousel />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
