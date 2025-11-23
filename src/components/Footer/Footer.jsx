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
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DG</span>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">DGES</h3>
                <p className="text-sm text-white/60">Gabon</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Direction Générale de l'Enseignement Supérieur - 
              Votre partenaire pour l'excellence académique au Gabon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gabon-green transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="font-bold text-lg mb-6">À propos</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/80 hover:text-gabon-green transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Libreville, Gabon
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  +241 01 23 45 67
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gabon-green flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  contact@dges.ga
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} DGES Gabon. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
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
