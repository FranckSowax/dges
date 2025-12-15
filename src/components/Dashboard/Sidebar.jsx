import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  GraduationCap,
  Globe,
  Newspaper,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Home,
  Bookmark,
  LayoutTemplate,
  Database,
  Bot,
  School,
  Landmark
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Toggle submenu expansion
  const toggleSubmenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Check if any submenu item is active
  const isSubmenuActive = (subItems) => {
    return subItems?.some(sub => location.pathname === sub.path);
  };

  const menuItems = [
    {
      title: 'Vue d\'ensemble',
      items: [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
        { icon: Home, label: 'Retour au site', path: '/' },
        { icon: LayoutTemplate, label: "Page d'Accueil", path: '/dashboard/home' }
      ]
    },
    {
      title: 'Intelligence Artificielle',
      items: [
        { icon: Database, label: 'Base de Connaissance', path: '/dashboard/knowledge' },
        // { icon: Bot, label: 'Historique du Chat', path: '/dashboard/chat-history' }
      ]
    },
    {
      title: 'DGES',
      items: [
        { icon: Users, label: 'Organigramme', path: '/dashboard/organigramme' },
        { icon: Users, label: 'Responsables', path: '/dashboard/responsables' },
        { icon: Building2, label: 'Attribution & Organisation', path: '/dashboard/attribution' }
      ]
    },
    {
      title: 'Établissements',
      items: [
        { 
          icon: Building2, 
          label: 'Établissements Publics', 
          path: '/dashboard/etablissements-publics',
          subItems: [
            { icon: GraduationCap, label: 'Universités', path: '/dashboard/etablissements-publics/universites' },
            { icon: School, label: 'Instituts', path: '/dashboard/etablissements-publics/instituts' },
            { icon: Landmark, label: 'Grandes Écoles', path: '/dashboard/etablissements-publics/grandes-ecoles' },
            { icon: Building2, label: 'Centres Universitaires', path: '/dashboard/etablissements-publics/centres-universitaires' }
          ]
        },
        { icon: Building2, label: 'Établissements Privés', path: '/dashboard/etablissements-prives' },
        { icon: Bookmark, label: 'Établissements RUP', path: '/dashboard/etablissements-rup' },
        { icon: Globe, label: 'Établissements Inter-État', path: '/dashboard/etablissements-inter-etat' }
      ]
    },
    {
      title: 'Coopération',
      items: [
        { icon: FileText, label: 'Conventions & Accords', path: '/dashboard/cooperation' }
      ]
    },
    {
      title: 'Ressources',
      items: [
        { icon: FileText, label: 'Textes Juridiques', path: '/dashboard/ressources' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: Newspaper, label: 'Actualités', path: '/dashboard/actualites' }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 bg-white border-r border-neutral-gray-light h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-gray-light">
        <div className="flex items-center gap-3">
          <img src="/logo-dges.png" alt="DGES" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-lg text-neutral-black">DGES Admin</h1>
            <p className="text-xs text-neutral-gray-dark">Portail de gestion</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <h2 className="px-4 text-xs font-semibold text-neutral-gray-dark uppercase tracking-wider mb-3">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedMenus[item.label] || isSubmenuActive(item.subItems);
                const isParentActive = isActive(item.path) || isSubmenuActive(item.subItems);

                return (
                  <li key={itemIdx}>
                    {hasSubItems ? (
                      <>
                        {/* Parent menu with submenu */}
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            isParentActive
                              ? 'bg-gabon-green/10 text-gabon-green'
                              : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isParentActive ? 'text-gabon-green' : 'text-neutral-gray-dark'}`} />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        
                        {/* Submenu items */}
                        {isExpanded && (
                          <ul className="mt-1 ml-4 pl-4 border-l-2 border-neutral-gray-light space-y-1">
                            {item.subItems.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  to={subItem.path}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                    isActive(subItem.path)
                                      ? 'bg-gabon-green text-white shadow-md'
                                      : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                                  }`}
                                >
                                  <subItem.icon className={`w-4 h-4 ${isActive(subItem.path) ? 'text-white' : 'text-neutral-gray-dark'}`} />
                                  <span className="flex-1">{subItem.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      /* Regular menu item without submenu */
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive(item.path)
                            ? 'bg-gabon-green text-white shadow-md'
                            : 'text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-neutral-gray-dark'}`} />
                        <span className="flex-1">{item.label}</span>
                        {isActive(item.path) && <ChevronRight className="w-4 h-4" />}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-gray-light">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-gray-dark hover:bg-neutral-gray-light hover:text-neutral-black transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
