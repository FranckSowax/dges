# 📋 Cahier des Charges - Refonte DGES Gabon

## 🎯 Objectif Principal

Concevoir la refonte complète du site web de la DGES Gabon (https://dges.ga/) pour le transformer en une plateforme de services numériques fluide, moderne et engageante, servant de vitrine technologique pour l'enseignement supérieur au Gabon.

## 🎨 Directives de Design

### Inspiration Visuelle
- **Style** : SaaS B2B moderne (référence : Awardco)
- **Philosophie** : Interface épurée, professionnelle et engageante

### Palette de Couleurs

#### Couleurs Officielles Modernisées
- **Vert Gabon** : `#009A44` (principal)
  - Vert Clair : `#E6F5EB` (fonds)
  - Vert Foncé : `#007A35` (hover)
  
- **Jaune Gabon** : `#FCD116` (secondaire)
  - Jaune Clair : `#FFFAE6` (fonds)
  - Jaune Foncé : `#E5BC00` (texte)
  
- **Bleu Gabon** : `#3A75C4` (tertiaire)
  - Bleu Clair : `#EBF2FA` (fonds)
  - Bleu Foncé : `#2A5A9E` (hover)

#### Couleurs Neutres
- Fond principal : `#F9FAFB` (blanc cassé)
- Texte principal : `#1A1A1A` (noir)
- Texte secondaire : `#4A5568` (gris foncé)
- Bordures : `#E2E8F0` (gris clair)

### Formes et Éléments UI

#### Bordures
- Cartes : `border-radius: 16px`
- Cartes grandes : `border-radius: 24px`
- Boutons : `border-radius: 8px` à `12px`
- Boutons pilule : `border-radius: 9999px`

#### Ombres
- Cartes au repos : `0 4px 6px rgba(0, 0, 0, 0.05)`
- Cartes au survol : `0 10px 20px rgba(0, 0, 0, 0.1)`
- Éléments flottants : `0 20px 40px rgba(0, 0, 0, 0.15)`

### Typographie

#### Police
- **Principale** : Inter (Sans-serif moderne)
- **Alternatives** : Poppins, Roboto

#### Hiérarchie
- **Titre Principal (H1)** : 48px-60px, Bold (700)
- **Sous-titres (H2)** : 36px-48px, SemiBold (600)
- **Titres de section (H3)** : 24px-32px, SemiBold (600)
- **Corps de texte** : 16px-18px, Regular (400)
- **Texte secondaire** : 14px, Regular (400)

## 🏗️ Structure et Fonctionnalités

### 1. Header & Navigation

#### Composants
- **Logo DGES** (gauche)
- **Navigation principale** (centre)
  - La DGES
  - Étudiants
  - Bourses
  - Établissements
  - Formations
  - Actualités
- **CTA Principal** (droite) : "Mon Espace Étudiant"

#### Mega Menu
- Déploiement au survol
- Organisation en colonnes (2-3 colonnes)
- Icônes pour chaque élément
- Section "Featured" mise en avant
- Descriptions courtes pour chaque lien

### 2. Section Héros

#### Éléments
- **Titre accrocheur** : "L'Enseignement Supérieur Gabonais à portée de clic"
- **Sous-titre** : Description courte et engageante
- **Visuel** : Illustration 3D ou photo haute qualité d'étudiants gabonais
- **Barre de recherche IA** : Proéminente et centrale

#### Barre de Recherche IA
- Placeholder : "Posez une question à notre assistant virtuel..."
- Exemples de questions suggérées
- Icône de recherche + bouton d'action
- Suggestions en temps réel

### 3. Section Services (Grille de Cartes)

#### Services Principaux
1. **Demande de Bourse**
   - Icône : 🎓
   - Description courte
   - Lien vers formulaire

2. **Homologation de Diplômes**
   - Icône : 📜
   - Description courte
   - Lien vers procédure

3. **Orientation Scolaire**
   - Icône : 🧭
   - Description courte
   - Lien vers outil

4. **Documentation**
   - Icône : 📚
   - Description courte
   - Lien vers bibliothèque

5. **Calendrier Universitaire**
   - Icône : 📅
   - Description courte
   - Lien vers calendrier

6. **Espace Établissements**
   - Icône : 🏛️
   - Description courte
   - Lien vers portail

#### Design des Cartes
- Fond blanc
- Ombre douce
- Icône colorée en haut
- Titre en gras
- Description courte
- Lien "En savoir plus"
- Effet hover : élévation + translation

### 4. Intégration IA

#### Chatbot
- **Position** : Bouton flottant en bas à droite
- **Design** : Moderne, bulles arrondies
- **Fonctionnalités** :
  - Suggestions de questions
  - Réponses instantanées
  - Transfert vers humain si nécessaire
  - Historique de conversation

#### Base de Connaissance
- **Section dédiée** : "Centre d'Aide"
- **Organisation** : FAQ dynamique
- **Fonctionnalités** :
  - Recherche intelligente
  - Catégorisation automatique
  - Résumés générés par IA
  - Liens vers documents complets

### 5. Section Vitrine

#### Partenaires et Écoles
- **Carrousel horizontal** : Logos des établissements
- **Effet défilement** : Automatique ou manuel
- **Hover** : Mise en avant au survol

#### Chiffres Clés
- **Statistiques** :
  - Nombre d'établissements
  - Nombre d'étudiants
  - Taux de réussite
  - Bourses attribuées
- **Design** : Cartes avec icônes et animations
- **Mise en page** : Grille 2x2 ou 4 colonnes

### 6. Footer

#### Sections
- **À propos** : Liens institutionnels
- **Services** : Liens rapides
- **Contact** : Coordonnées complètes
- **Légal** : Mentions, confidentialité
- **Réseaux sociaux** : Icônes cliquables

## 🛠️ Instructions Techniques

### Stack Frontend
- **Framework** : React.js 18+
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Routing** : React Router DOM

### Stack Backend IA (Phase 2)
- **Langage** : Python 3.10+
- **Framework IA** : LangChain
- **Architecture** : RAG (Retrieval Augmented Generation)
- **Base Vectorielle** : Pinecone
- **API** : FastAPI ou Flask

### Indexation des Documents
- **Sources** :
  - Tous les PDF du site actuel
  - Pages web existantes
  - Documents administratifs
  - FAQ et guides
- **Traitement** :
  - Extraction de texte
  - Chunking intelligent
  - Vectorisation
  - Indexation dans Pinecone

## 🤖 System Prompt du Chatbot

```
Tu es un assistant virtuel de la Direction Générale de l'Enseignement Supérieur du Gabon. 
Ton rôle est d'aider les étudiants, les parents et les professionnels de l'éducation à 
trouver des informations sur les services de la DGES.

COMPORTEMENT :
- Professionnel mais chaleureux et accessible
- Concis et précis dans tes réponses
- Proactif : propose des options et des solutions
- Empathique : comprends les préoccupations des étudiants
- Honnête : reconnais quand tu ne sais pas et propose des alternatives

ACCÈS AUX DONNÉES :
1. Base de connaissances officielle de la DGES
2. Procédures administratives complètes
3. Dates importantes du calendrier universitaire
4. Conditions d'éligibilité aux bourses (nationales et internationales)
5. Procédures d'inscription et de réinscription
6. Informations sur les établissements partenaires
7. Programmes et formations disponibles

RÉPONSES :
- Structure tes réponses de manière claire (listes, étapes)
- Utilise des émojis pertinents pour rendre les réponses plus engageantes
- Fournis des liens vers les ressources officielles
- Propose toujours une action concrète

SI TU NE SAIS PAS :
- Admets-le honnêtement
- Propose de contacter le service concerné
- Fournis les coordonnées appropriées (téléphone, email)
- Suggère des ressources alternatives

EXEMPLES DE RÉPONSES :

Question : "Comment obtenir une bourse ?"
Réponse : "Pour obtenir une bourse d'études, voici les étapes à suivre :

📋 **Étapes :**
1. Vérifiez votre éligibilité (moyenne ≥ 12/20)
2. Préparez vos documents (relevés de notes, certificat de scolarité)
3. Remplissez le formulaire en ligne sur notre portail
4. Soumettez avant la date limite (30 décembre 2024)

📞 **Besoin d'aide ?**
- Service des bourses : +241 01 23 45 67
- Email : bourses@dges.ga

🔗 [Accéder au formulaire de demande](/bourses/demande)"

LANGUE :
- Utilise le français standard
- Adapte ton niveau de langage à l'utilisateur
- Explique les termes techniques si nécessaire

LIMITES :
- Ne donne pas de conseils juridiques définitifs
- Ne garantis pas l'attribution de bourses ou l'admission
- Redirige vers les services compétents pour les cas complexes
```

## 📊 Wireframe Textuel - Page d'Accueil

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                       │
│ [Logo DGES] [Nav: DGES | Étudiants | Bourses | Établis...] [Mon Espace] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ HERO SECTION                                                 │
│                                                              │
│  [Texte Gauche]                    [Illustration 3D Droite] │
│  Badge: "Plateforme avec IA"                                │
│  Titre: "L'Enseignement Supérieur                           │
│         Gabonais à portée de clic"                          │
│  Sous-titre: Description...                                 │
│                                                              │
│  [🔍 Barre de recherche IA large et proéminente]           │
│                                                              │
│  Stats: [15+ Établissements] [50K+ Étudiants] [95% Satisfaction] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SERVICES GRID                                                │
│ Titre: "Nos Services en Ligne"                              │
│                                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│ │ 🎓       │ │ 📜       │ │ 🧭       │                     │
│ │ Bourses  │ │ Homolog. │ │ Orient.  │                     │
│ └──────────┘ └──────────┘ └──────────┘                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│ │ 📚       │ │ 📅       │ │ 🏛️       │                     │
│ │ Docs     │ │ Calendr. │ │ Établis. │                     │
│ └──────────┘ └──────────┘ └──────────┘                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STATS SECTION                                                │
│ Titre: "La DGES en Chiffres"                                │
│                                                              │
│ [15+ Établissements] [50K+ Étudiants] [2.5K+ Bourses] [95% Satisfaction] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PARTNERS CAROUSEL                                            │
│ Titre: "Nos Établissements Partenaires"                     │
│                                                              │
│ [Logo UOB] [Logo USTM] [Logo ENS] [Logo EPM] ...            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
│ [Logo] [Services] [À propos] [Contact]                      │
│ [Réseaux sociaux] [Mentions légales]                        │
└─────────────────────────────────────────────────────────────┘

[💬 Chatbot Flottant - Bas Droite]
```

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations Mobile
- Navigation : Menu hamburger
- Hero : Texte au-dessus, image en-dessous
- Services : Grille 1 colonne
- Stats : Grille 2x2
- Partners : Défilement horizontal

## ✅ Critères de Succès

### Performance
- Temps de chargement < 3 secondes
- Score Lighthouse > 90
- Optimisation images et assets

### Accessibilité
- Conformité WCAG 2.1 niveau AA
- Navigation au clavier
- Lecteurs d'écran compatibles

### SEO
- Meta tags optimisés
- Structure sémantique HTML5
- Sitemap.xml et robots.txt

### UX
- Parcours utilisateur fluide
- Formulaires intuitifs
- Messages d'erreur clairs
- Feedback visuel immédiat

## 🚀 Phases de Développement

### Phase 1 : Frontend (4 semaines)
- ✅ Setup projet React + Tailwind
- ✅ Système de navigation
- ✅ Composants UI réutilisables
- ✅ Pages principales
- ✅ Responsive design

### Phase 2 : Backend & IA (6 semaines)
- [ ] API REST
- [ ] Authentification
- [ ] Intégration LangChain
- [ ] Base vectorielle
- [ ] Chatbot fonctionnel

### Phase 3 : Services (4 semaines)
- [ ] Formulaires de demande
- [ ] Espace personnel
- [ ] Suivi de dossier
- [ ] Notifications

### Phase 4 : Tests & Déploiement (2 semaines)
- [ ] Tests utilisateurs
- [ ] Corrections bugs
- [ ] Optimisation performances
- [ ] Mise en production

## 📞 Contacts Projet

- **Chef de Projet** : À définir
- **Développeur Lead** : À définir
- **Designer UI/UX** : À définir
- **Expert IA** : À définir

---

**Version** : 1.0  
**Date** : Novembre 2024  
**Statut** : En développement
