import React from 'react';
import { 
  Home, Building2, GraduationCap, Award, BookOpen, 
  FileText, Users, Calendar, MapPin, Phone 
} from 'lucide-react';

export const navigationData = [
  {
    id: 'accueil',
    label: 'Accueil',
    href: '/',
  },
  {
    id: 'dges',
    label: 'La DGES',
    megaMenu: {
      sections: [
        {
          title: 'À Propos',
          items: [
            {
              label: 'Présentation',
              description: 'Découvrez notre mission et nos valeurs',
              icon: <Building2 className="w-5 h-5" />,
              href: '/presentation'
            },
            {
              label: 'Organisation',
              description: 'Structure et organigramme',
              icon: <Users className="w-5 h-5" />,
              href: '/organisation'
            },
            {
              label: 'Équipe Dirigeante',
              description: 'Rencontrez nos leaders',
              icon: <Users className="w-5 h-5" />,
              href: '/equipe'
            }
          ]
        },
        {
          title: 'Informations',
          items: [
            {
              label: 'Actualités',
              description: 'Les dernières nouvelles',
              icon: <FileText className="w-5 h-5" />,
              href: '/actualites'
            },
            {
              label: 'Événements',
              description: 'Calendrier des événements',
              icon: <Calendar className="w-5 h-5" />,
              href: '/evenements'
            },
            {
              label: 'Contact',
              description: 'Nous contacter',
              icon: <Phone className="w-5 h-5" />,
              href: '/contact'
            }
          ]
        }
      ],
      featured: {
        badge: 'Nouveau',
        title: 'Rapport Annuel 2024',
        description: 'Découvrez nos réalisations et nos objectifs pour l\'année à venir',
        cta: 'Télécharger le rapport',
        href: '/rapport-annuel'
      }
    }
  },
  {
    id: 'etudiants',
    label: 'Étudiants',
    megaMenu: {
      sections: [
        {
          title: 'Services Étudiants',
          items: [
            {
              label: 'Inscription',
              description: 'Procédures d\'inscription',
              icon: <GraduationCap className="w-5 h-5" />,
              href: '/inscription'
            },
            {
              label: 'Orientation',
              description: 'Trouvez votre voie',
              icon: <MapPin className="w-5 h-5" />,
              href: '/orientation'
            },
            {
              label: 'Vie Étudiante',
              description: 'Activités et associations',
              icon: <Users className="w-5 h-5" />,
              href: '/vie-etudiante'
            }
          ]
        },
        {
          title: 'Documents',
          items: [
            {
              label: 'Attestations',
              description: 'Demandez vos attestations',
              icon: <FileText className="w-5 h-5" />,
              href: '/attestations'
            },
            {
              label: 'Relevés de Notes',
              description: 'Consultez vos résultats',
              icon: <BookOpen className="w-5 h-5" />,
              href: '/releves'
            },
            {
              label: 'Diplômes',
              description: 'Homologation et équivalence',
              icon: <Award className="w-5 h-5" />,
              href: '/diplomes'
            }
          ]
        }
      ],
      featured: {
        badge: 'Important',
        title: 'Calendrier Universitaire',
        description: 'Consultez les dates importantes de l\'année académique 2024-2025',
        cta: 'Voir le calendrier',
        href: '/calendrier'
      }
    }
  },
  {
    id: 'bourses',
    label: 'Bourses',
    megaMenu: {
      sections: [
        {
          title: 'Types de Bourses',
          items: [
            {
              label: 'Bourses Nationales',
              description: 'Bourses du gouvernement gabonais',
              icon: <Award className="w-5 h-5" />,
              href: '/bourses/nationales'
            },
            {
              label: 'Bourses Internationales',
              description: 'Opportunités à l\'étranger',
              icon: <Award className="w-5 h-5" />,
              href: '/bourses/internationales'
            },
            {
              label: 'Bourses d\'Excellence',
              description: 'Pour les meilleurs étudiants',
              icon: <Award className="w-5 h-5" />,
              href: '/bourses/excellence'
            }
          ]
        },
        {
          title: 'Démarches',
          items: [
            {
              label: 'Faire une Demande',
              description: 'Déposez votre dossier en ligne',
              icon: <FileText className="w-5 h-5" />,
              href: '/bourses/demande'
            },
            {
              label: 'Critères d\'Éligibilité',
              description: 'Vérifiez vos conditions',
              icon: <BookOpen className="w-5 h-5" />,
              href: '/bourses/criteres'
            },
            {
              label: 'Suivi de Dossier',
              description: 'Consultez l\'état de votre demande',
              icon: <FileText className="w-5 h-5" />,
              href: '/bourses/suivi'
            }
          ]
        }
      ],
      featured: {
        badge: 'Ouvert',
        title: 'Campagne de Bourses 2024',
        description: 'Les candidatures sont ouvertes jusqu\'au 30 décembre 2024',
        cta: 'Postuler maintenant',
        href: '/bourses/campagne-2024'
      }
    }
  },
  {
    id: 'etablissements',
    label: 'Établissements',
    megaMenu: {
      sections: [
        {
          title: 'Types d\'Établissements',
          items: [
            {
              label: 'Universités Publiques',
              description: 'Liste des universités d\'État',
              icon: <Building2 className="w-5 h-5" />,
              href: '/etablissements/universites-publiques'
            },
            {
              label: 'Universités Privées',
              description: 'Établissements privés agréés',
              icon: <Building2 className="w-5 h-5" />,
              href: '/etablissements/universites-privees'
            },
            {
              label: 'Grandes Écoles',
              description: 'Écoles spécialisées',
              icon: <Building2 className="w-5 h-5" />,
              href: '/etablissements/grandes-ecoles'
            }
          ]
        },
        {
          title: 'Services',
          items: [
            {
              label: 'Accréditation',
              description: 'Processus d\'accréditation',
              icon: <Award className="w-5 h-5" />,
              href: '/etablissements/accreditation'
            },
            {
              label: 'Partenariats',
              description: 'Collaborations internationales',
              icon: <Users className="w-5 h-5" />,
              href: '/etablissements/partenariats'
            },
            {
              label: 'Statistiques',
              description: 'Données et indicateurs',
              icon: <FileText className="w-5 h-5" />,
              href: '/etablissements/statistiques'
            }
          ]
        }
      ],
      featured: {
        badge: 'Guide',
        title: 'Annuaire des Établissements',
        description: 'Trouvez l\'établissement qui correspond à vos ambitions',
        cta: 'Consulter l\'annuaire',
        href: '/annuaire'
      }
    }
  },
  {
    id: 'formations',
    label: 'Formations',
    href: '/formations'
  }
];
