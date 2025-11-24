import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Bourses', href: '/bourses' },
      { label: 'Orientation', href: '/orientation' },
      { label: 'Homologation', href: '/homologation' },
      { label: 'Documentation', href: '/documentation' }
    ],
    about: [
      { label: 'Présentation', href: '/presentation' },
      { label: 'Organisation', href: '/organisation' },
      { label: 'Actualités', href: '/actualites' },
      { label: 'Contact', href: '/contact' }
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: 'Conditions d\'utilisation', href: '/conditions' },
      { label: 'Accessibilité', href: '/accessibilite' }
    ]
  };

  return (
    <footer className="bg-neutral-black text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">DG</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold leading-tight">DGES</h3>
                <p className="text-xs sm:text-sm text-white/60">Gabon</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Direction Générale de l'Enseignement Supérieur - 
              Votre partenaire pour l'excellence académique au Gabon.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors active:scale-95">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors active:scale-95">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors active:scale-95">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm sm:text-base text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">À propos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm sm:text-base text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-xs sm:text-sm">
                  Libreville, Gabon
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-xs sm:text-sm">
                  +241 01 23 45 67
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-xs sm:text-sm">
                  contact@dges.ga
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
            <p className="text-white/60 text-xs sm:text-sm">
              © {currentYear} DGES Gabon. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
