# 🇬🇦 DGES Gabon - Portail Moderne de l'Enseignement Supérieur

Plateforme web moderne et interactive pour la Direction Générale de l'Enseignement Supérieur du Gabon.

## 🎯 Objectif

Transformer le site informatif de la DGES en une plateforme de services numériques fluide, moderne et engageante, servant de vitrine technologique pour l'enseignement supérieur au Gabon.

## ✨ Fonctionnalités Principales

### 🎨 Design Moderne
- **Inspiration SaaS B2B** : Interface épurée et professionnelle
- **Palette Gabon** : Vert (#009A44), Jaune (#FCD116), Bleu (#3A75C4)
- **UI Cards** : Design basé sur des cartes avec ombres douces
- **Animations** : Transitions fluides avec Framer Motion

### 🧭 Navigation Intelligente
- **Header Moderne** : Logo, navigation principale, CTA "Mon Espace"
- **Mega Menu** : Menus déroulants riches avec icônes et descriptions
- **Responsive** : Adapté mobile, tablette et desktop

### 🤖 Intelligence Artificielle
- **Barre de Recherche IA** : Assistant virtuel pour répondre aux questions
- **Chatbot Flottant** : Disponible 24/7 pour assistance
- **Suggestions Intelligentes** : Questions fréquentes pré-remplies

### 📋 Services en Ligne
- Demande de Bourse
- Homologation de Diplômes
- Orientation Scolaire
- Documentation Administrative
- Calendrier Universitaire
- Espace Établissements

### 📊 Sections Clés
- **Hero Section** : Accroche forte avec recherche IA
- **Services Grid** : 6 services principaux en cartes
- **Stats Section** : Chiffres clés de la DGES
- **Partners Carousel** : Établissements partenaires
- **Footer Complet** : Liens, contact, réseaux sociaux

## 🛠️ Stack Technique

### Frontend
- **React 18** : Framework JavaScript moderne
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Styling utility-first
- **Framer Motion** : Animations fluides
- **Lucide React** : Icônes modernes

### Backend IA (À venir)
- **Python** : Langage backend
- **LangChain** : Framework IA
- **RAG** : Retrieval Augmented Generation
- **Pinecone** : Base vectorielle pour indexation

## 🚀 Installation

### Prérequis
- Node.js 18+ et npm/yarn

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Build de production
```bash
npm run build
```

### Prévisualisation du build
```bash
npm run preview
```

## 📁 Structure du Projet

```
windsurf-project/
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   │   ├── Header.jsx          # En-tête avec navigation
│   │   │   └── MegaMenu.jsx        # Menu déroulant riche
│   │   ├── Hero/
│   │   │   └── HeroSection.jsx     # Section héros avec recherche IA
│   │   ├── Services/
│   │   │   └── ServicesGrid.jsx    # Grille des services
│   │   ├── Stats/
│   │   │   └── StatsSection.jsx    # Statistiques clés
│   │   ├── Partners/
│   │   │   └── PartnersCarousel.jsx # Carrousel partenaires
│   │   ├── Chatbot/
│   │   │   └── ChatbotWidget.jsx   # Widget chatbot flottant
│   │   └── Footer/
│   │       └── Footer.jsx          # Pied de page
│   ├── data/
│   │   └── navigationData.jsx      # Données de navigation
│   ├── App.jsx                     # Composant principal
│   ├── main.jsx                    # Point d'entrée
│   └── index.css                   # Styles globaux
├── public/                         # Assets statiques
├── index.html                      # HTML principal
├── package.json                    # Dépendances
├── vite.config.js                  # Configuration Vite
├── tailwind.config.js              # Configuration Tailwind
└── README.md                       # Documentation
```

## 🎨 Palette de Couleurs

### Couleurs Primaires
- **Vert Gabon** : `#009A44` (accent principal)
- **Jaune Gabon** : `#FCD116` (accent secondaire)
- **Bleu Gabon** : `#3A75C4` (tertiaire)

### Couleurs Secondaires
- **Vert Clair** : `#E6F5EB` (arrière-plan)
- **Jaune Clair** : `#FFFAE6` (arrière-plan)
- **Bleu Clair** : `#EBF2FA` (arrière-plan)

### Neutres
- **Noir** : `#1A1A1A` (texte principal)
- **Gris Foncé** : `#4A5568` (texte secondaire)
- **Gris Clair** : `#E2E8F0` (bordures)
- **Arrière-plan** : `#F9FAFB`

## 🤖 Prompt du Chatbot IA

Le chatbot est configuré pour agir comme un conseiller d'orientation expert :

```
Tu es un assistant virtuel de la Direction Générale de l'Enseignement Supérieur du Gabon. 
Ton rôle est d'aider les étudiants, les parents et les professionnels de l'éducation à 
trouver des informations sur les services de la DGES.

Comportement :
- Professionnel mais chaleureux
- Concis et précis
- Proactif dans la proposition d'options
- Capable de reconnaître quand une question nécessite un contact humain

Accès aux données :
- Base de connaissances officielle de la DGES
- Procédures administratives
- Dates importantes du calendrier universitaire
- Conditions d'éligibilité aux bourses
- Procédures d'inscription
```

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints principaux :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🔮 Prochaines Étapes

### Phase 1 - Frontend (Actuel)
- ✅ Structure de navigation moderne
- ✅ Design system avec Tailwind
- ✅ Composants réutilisables
- ✅ Animations et interactions

### Phase 2 - Backend & IA
- [ ] API REST avec Node.js/Express
- [ ] Intégration LangChain pour le chatbot
- [ ] Base vectorielle Pinecone
- [ ] Indexation des documents PDF

### Phase 3 - Services
- [ ] Système d'authentification
- [ ] Espace étudiant personnalisé
- [ ] Formulaires de demande en ligne
- [ ] Suivi de dossier en temps réel

### Phase 4 - Déploiement
- [ ] Tests utilisateurs
- [ ] Optimisation performances
- [ ] SEO et accessibilité
- [ ] Mise en production

## 👥 Contribution

Ce projet est développé pour la DGES Gabon. Pour toute contribution ou suggestion, veuillez contacter l'équipe de développement.

## 📄 Licence

© 2024 DGES Gabon. Tous droits réservés.

## 📞 Contact

- **Email** : contact@dges.ga
- **Téléphone** : +241 01 23 45 67
- **Adresse** : Libreville, Gabon

---

Développé avec ❤️ pour l'enseignement supérieur gabonais
