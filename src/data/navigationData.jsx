import React from 'react';
import { 
  Building2, Users, FileText, Target, School, 
  Globe, FlaskConical, Lightbulb, Handshake, Plane,
  BarChart3, ClipboardCheck, BookOpen, Scale, Image,
  Newspaper, LayoutGrid, Bookmark
} from 'lucide-react';

export const navigationData = [
  {
    id: 'dges',
    label: 'DGES',
    megaMenu: {
      sections: [
        {
          title: 'Organisation',
          items: [
            {
              label: 'Organigramme de la DGES',
              description: 'Structure hiérarchique',
              icon: <LayoutGrid className="w-5 h-5" />,
              href: '/dges/organigramme'
            },
            {
              label: 'Annuaire des Responsables',
              description: 'Contacts clés',
              icon: <Users className="w-5 h-5" />,
              href: '/dges/responsables'
            },
            {
              label: 'Attribution & Organisation',
              description: 'Missions et fonctionnement',
              icon: <Building2 className="w-5 h-5" />,
              href: '/dges/organisation'
            }
          ]
        },
        {
          title: 'Documents Stratégiques',
          items: [
            {
              label: 'Annuaire des Etablissements Publics',
              description: 'Liste officielle',
              icon: <School className="w-5 h-5" />,
              href: '/dges/annuaire-public'
            },
            {
              label: 'Plan d\'action de la DGES',
              description: 'Feuille de route',
              icon: <Target className="w-5 h-5" />,
              href: '/dges/plan-action'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'etablissements',
    label: 'Etablissements',
    megaMenu: {
      sections: [
        {
          title: 'Types d\'Établissements',
          items: [
            {
              label: 'Public',
              description: 'Universités et Grandes Écoles d\'État',
              icon: <School className="w-5 h-5" />,
              href: '/etablissements-publics'
            },
            {
              label: 'Privé',
              description: 'Établissements privés agréés',
              icon: <Building2 className="w-5 h-5" />,
              href: '/etablissements-prives'
            },
            {
              label: 'RUP',
              description: 'Reconnus d\'Utilité Publique',
              icon: <Bookmark className="w-5 h-5" />,
              href: '/etablissements-rup'
            },
            {
              label: 'Inter-Etat',
              description: 'Établissements internationaux',
              icon: <Globe className="w-5 h-5" />,
              href: '/etablissements-inter-etat'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'recherche',
    label: 'Recherche & innovation',
    megaMenu: {
      sections: [
        {
          title: 'Pôles de Recherche',
          items: [
            {
              label: 'Laboratoires de Recherche',
              description: 'Unités et équipes',
              icon: <FlaskConical className="w-5 h-5" />,
              href: '/recherche/laboratoires'
            },
            {
              label: 'Recherche scientifique et Innovation',
              description: 'Programmes et projets',
              icon: <Lightbulb className="w-5 h-5" />,
              href: '/recherche/innovation'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'cooperation',
    label: 'Coopération & Relation internationale',
    href: '/cooperation/accords',
    megaMenu: {
      sections: [
        {
          title: 'International',
          items: [
            {
              label: 'Accords de partenariat',
              description: 'Conventions signées',
              icon: <Globe className="w-5 h-5" />,
              href: '/cooperation/accords'
            },
            {
              label: 'La Mobilité étudiante',
              description: 'Échanges et voyages d\'études',
              icon: <Plane className="w-5 h-5" />,
              href: '/cooperation/mobilite'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'realisations',
    label: 'Réalisations & Stats',
    megaMenu: {
      sections: [
        {
          title: 'Données et Bilan',
          items: [
            {
              label: 'Statistiques',
              description: 'Chiffres clés de l\'ES',
              icon: <BarChart3 className="w-5 h-5" />,
              href: '/stats/statistiques'
            },
            {
              label: 'Bilans & réalisations',
              description: 'Rapports d\'activité',
              icon: <ClipboardCheck className="w-5 h-5" />,
              href: '/stats/bilans'
            },
            {
              label: 'Etudes',
              description: 'Analyses et prospective',
              icon: <BookOpen className="w-5 h-5" />,
              href: '/stats/etudes'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'ressources',
    label: 'Ressources',
    megaMenu: {
      sections: [
        {
          title: 'Cadre Juridique',
          items: [
            {
              label: 'Textes fondamentaux',
              description: 'Lois et décrets nationaux',
              icon: <Scale className="w-5 h-5" />,
              href: '/ressources/textes-fondamentaux'
            },
            {
              label: 'Textes Communautaires',
              description: 'Règlements CEMAC/CAMES',
              icon: <Globe className="w-5 h-5" />,
              href: '/ressources/textes-communautaires'
            },
            {
              label: 'Gouvernance du système',
              description: 'Pilotage et régulation',
              icon: <Building2 className="w-5 h-5" />,
              href: '/ressources/gouvernance'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'actualites',
    label: 'Actualités',
    href: '/actualites'
  }
];
