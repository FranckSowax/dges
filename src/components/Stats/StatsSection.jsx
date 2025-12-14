import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Landmark, Building2, Globe, ArrowRight } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: School,
    value: '13',
    label: 'Établissements Publics',
    description: 'Universités et Grandes Écoles d\'État',
    color: 'green',
    href: '/etablissements-publics'
  },
  {
    id: 2,
    icon: Landmark,
    value: '5',
    label: 'Établissements RUP',
    description: 'Reconnus d\'Utilité Publique',
    color: 'blue',
    href: '/etablissements-rup'
  },
  {
    id: 3,
    icon: Building2,
    value: '64',
    label: 'Établissements Privés',
    description: 'Accrédités par la DGES',
    color: 'yellow',
    href: '/etablissements-prives'
  },
  {
    id: 4,
    icon: Globe,
    value: '3',
    label: 'Établissements Inter-État',
    description: 'Institutions internationales',
    color: 'green',
    href: '/etablissements-inter-etat'
  }
];

const colorClasses = {
  green: 'from-gabon-green to-gabon-green-dark',
  blue: 'from-gabon-blue to-gabon-blue-dark',
  yellow: 'from-gabon-yellow-dark to-gabon-yellow'
};

const StatsSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-3 sm:mb-4">
              La DGES en Chiffres
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-gray-dark max-w-2xl mx-auto px-4">
              Des résultats concrets au service de l'excellence académique
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <Link to={stat.href} className="card h-full flex flex-col cursor-pointer hover:shadow-xl transition-shadow">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${colorClasses[stat.color]} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <motion.p
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="text-3xl sm:text-4xl font-bold text-neutral-black"
                    >
                      {stat.value}
                    </motion.p>
                  </div>

                  {/* Label */}
                  <p className="text-base sm:text-lg font-semibold text-neutral-black mb-1 group-hover:text-gabon-green transition-colors">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-gray-dark mb-3">
                    {stat.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto flex items-center text-gabon-green font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>Voir la liste</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
