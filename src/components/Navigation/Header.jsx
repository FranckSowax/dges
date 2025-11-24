import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, MoreHorizontal } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { navigationData } from '../../data/navigationData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Séparer les menus : principaux (3 premiers) et secondaires (le reste)
  const primaryMenus = navigationData.slice(0, 3); // DGES, Etablissements, Recherche
  const secondaryMenus = navigationData.slice(3); // Coopération, Stats, Ressources, Actualités

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
          ? 'bg-white shadow-md py-2 sm:py-3' 
          : 'bg-white/95 backdrop-blur-sm py-3 sm:py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
            <img 
              src="/LOGO-DGES-2-1.png" 
              alt="Logo DGES Gabon" 
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Menus Principaux */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryMenus.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.megaMenu && setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1 whitespace-nowrap ${
                    activeMenu === item.id
                      ? 'bg-gabon-green-light text-gabon-green'
                      : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.megaMenu && <ChevronDown className="w-4 h-4" />}
                </button>

                {item.megaMenu && activeMenu === item.id && (
                  <MegaMenu data={item.megaMenu} />
                )}
              </div>
            ))}

            {/* Menu "Plus" pour les sections secondaires */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreMenuOpen(true)}
              onMouseLeave={() => setIsMoreMenuOpen(false)}
            >
              <button
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1 ${
                  isMoreMenuOpen
                    ? 'bg-gabon-green-light text-gabon-green'
                    : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                }`}
              >
                <MoreHorizontal className="w-5 h-5" />
                <span>Plus</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu "Plus" */}
              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white rounded-xl shadow-xl border border-neutral-gray-light overflow-hidden">
                    {secondaryMenus.map((item) => (
                      <Link
                        key={item.id}
                        to={item.href || '#'}
                        className="block px-4 py-3 text-sm text-neutral-gray-dark hover:bg-gabon-green-light hover:text-gabon-green transition-colors border-b border-neutral-gray-light last:border-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-neutral-gray-light transition-colors">
              <Search className="w-5 h-5 text-neutral-gray-dark" />
            </button>

            {/* User Menu - Direct Link */}
            <a
              href="https://admin.dges.ga/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 bg-gabon-green text-white px-3 md:px-4 py-2 rounded-full font-medium hover:bg-gabon-green-dark transition-all duration-200 shadow-sm hover:shadow-md text-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">Mon Compte</span>
            </a>

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

        {/* Mobile Menu - Improved */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-neutral-gray-light pt-4 max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {navigationData.map((item) => (
                <Link
                  key={item.id}
                  to={item.href || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm text-neutral-gray-dark hover:bg-gabon-green-light hover:text-gabon-green transition-colors font-medium active:scale-95"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-neutral-gray-light mt-3 space-y-2">
                <a
                  href="https://admin.dges.ga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gabon-green text-white px-4 py-3 rounded-xl font-medium hover:bg-gabon-green-dark transition-all duration-200 text-sm active:scale-95 flex items-center justify-center"
                >
                  Mon Compte
                </a>
                <button className="w-full bg-neutral-gray-light text-neutral-black px-4 py-3 rounded-xl font-medium hover:bg-neutral-gray transition-all duration-200 text-sm flex items-center justify-center gap-2 active:scale-95">
                  <Search className="w-4 h-4" />
                  Rechercher
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
