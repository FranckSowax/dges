import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    dges: [
      { label: 'Organigramme', href: '/dges/organigramme' },
      { label: 'Annuaire des Responsables', href: '/dges/responsables' },
      { label: 'Attribution & Organisation', href: '/dges/organisation' },
      { label: 'Actualités', href: '/actualites' }
    ],
    etablissements: [
      { label: 'Établissements Publics', href: '/etablissements-publics' },
      { label: 'Établissements Privés', href: '/etablissements-prives' },
      { label: 'Établissements RUP', href: '/etablissements-rup' },
      { label: 'Établissements Inter-État', href: '/etablissements-inter-etat' }
    ],
    cooperation: [
      { label: 'Accords de partenariat', href: '/cooperation/accords' }
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: 'Conditions d\'utilisation', href: '/conditions' }
    ]
  };

  return (
    <footer className="bg-neutral-black text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4 sm:mb-6">
              <a href="/" className="inline-block">
                <img 
                  src="/LOGO-DGES-WHT--2.png" 
                  alt="Logo DGES Gabon" 
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </a>
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

          {/* DGES */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">DGES</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.dges.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-sm sm:text-base text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Établissements */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Établissements</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.etablissements.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-sm sm:text-base text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Coopération */}
              <li className="pt-2 mt-2 border-t border-white/10">
                <Link to="/cooperation/accords" className="text-sm sm:text-base text-white/80 hover:text-gabon-green transition-colors">
                  Coopération Internationale
                </Link>
              </li>
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
