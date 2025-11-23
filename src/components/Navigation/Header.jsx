import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { navigationData } from '../../data/navigationData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DG</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-neutral-black leading-tight">DGES</h1>
              <p className="text-xs text-neutral-gray-dark">Gabon</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationData.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.megaMenu && setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1 ${
                    activeMenu === item.id
                      ? 'bg-gabon-green-light text-gabon-green'
                      : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.megaMenu && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Mega Menu */}
                {item.megaMenu && activeMenu === item.id && (
                  <MegaMenu data={item.megaMenu} />
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-gray-light transition-colors">
              <Search className="w-5 h-5 text-neutral-gray-dark" />
            </button>

            {/* CTA Button */}
            <button className="hidden md:flex items-center space-x-2 bg-gabon-green text-white px-5 py-2.5 rounded-full font-medium hover:bg-gabon-green-dark transition-all duration-200 shadow-sm hover:shadow-md">
              <User className="w-4 h-4" />
              <span>Mon Espace</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-gray-light transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-black" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-neutral-gray-light pt-4">
            <nav className="flex flex-col space-y-2">
              {navigationData.map((item) => (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  className="px-4 py-3 rounded-lg text-neutral-gray-dark hover:bg-gabon-green-light hover:text-gabon-green transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
              <button className="mt-4 w-full bg-gabon-green text-white px-5 py-3 rounded-full font-medium hover:bg-gabon-green-dark transition-all duration-200">
                Mon Espace Étudiant
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
