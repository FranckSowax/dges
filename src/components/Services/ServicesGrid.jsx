import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, FileCheck, Compass, FileText, 
  Calendar, Building2, ArrowRight 
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Demande de Bourse',
    description: 'Démarrez votre demande de bourse en ligne en quelques minutes',
    icon: GraduationCap,
    color: 'green',
    href: '/bourses/demande'
  },
  {
    id: 2,
    title: 'Homologation de Diplômes',
    description: 'Faites reconnaître vos diplômes étrangers',
    icon: FileCheck,
    color: 'blue',
    href: '/diplomes/homologation'
  },
  {
    id: 3,
    title: 'Orientation Scolaire',
    description: 'Trouvez la formation qui correspond à votre profil',
    icon: Compass,
    color: 'yellow',
    href: '/orientation'
  },
  {
    id: 4,
    title: 'Documentation',
    description: 'Téléchargez les formulaires et documents officiels',
    icon: FileText,
    color: 'green',
    href: '/documentation'
  },
  {
    id: 5,
    title: 'Calendrier Universitaire',
    description: 'Restez informé des dates importantes',
    icon: Calendar,
    color: 'blue',
    href: '/calendrier'
  },
  {
    id: 6,
    title: 'Espace Établissements',
    description: 'Accès aux services pour les établissements partenaires',
    icon: Building2,
    color: 'yellow',
    href: '/etablissements/espace'
  }
];

const colorClasses = {
  green: {
    bg: 'bg-gabon-green-light',
    icon: 'text-gabon-green',
    hover: 'group-hover:bg-gabon-green group-hover:text-white'
  },
  blue: {
    bg: 'bg-gabon-blue-light',
    icon: 'text-gabon-blue',
    hover: 'group-hover:bg-gabon-blue group-hover:text-white'
  },
  yellow: {
    bg: 'bg-gabon-yellow-light',
    icon: 'text-gabon-yellow-dark',
    hover: 'group-hover:bg-gabon-yellow group-hover:text-white'
  }
};

const ServicesGrid = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-black mb-4">
              Nos Services en Ligne
            </h2>
            <p className="text-xl text-neutral-gray-dark max-w-2xl mx-auto">
              Accédez rapidement à tous les services dont vous avez besoin pour votre parcours académique
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color];

            return (
              <motion.a
                key={service.id}
                href={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group card cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${colors.hover}`}>
                  <Icon className={`w-8 h-8 ${colors.icon} transition-colors duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-black mb-2 group-hover:text-gabon-green transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-gray-dark mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="flex items-center space-x-2 text-gabon-green font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-gray-dark mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <button className="btn-secondary">
            Contactez notre support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
