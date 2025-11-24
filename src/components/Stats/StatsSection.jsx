import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Building2,
    value: '5',
    label: 'Universités Publiques',
    description: 'Établissements d\'enseignement supérieur',
    color: 'green'
  },
  {
    id: 2,
    icon: Award,
    value: '8',
    label: 'Grandes Écoles & Instituts Publics',
    description: 'Formations spécialisées',
    color: 'blue'
  },
  {
    id: 3,
    icon: Building2,
    value: '64',
    label: 'Établissements Privés',
    description: 'Agréés par la DGES',
    color: 'yellow'
  },
  {
    id: 4,
    icon: Users,
    value: '77',
    label: 'Total Établissements',
    description: 'Public et privé confondus',
    color: 'green'
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-black mb-4">
              La DGES en Chiffres
            </h2>
            <p className="text-xl text-neutral-gray-dark max-w-2xl mx-auto">
              Des résultats concrets au service de l'excellence académique
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="card h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[stat.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <motion.p
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="text-4xl font-bold text-neutral-black"
                    >
                      {stat.value}
                    </motion.p>
                  </div>

                  {/* Label */}
                  <p className="text-lg font-semibold text-neutral-black mb-1">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-neutral-gray-dark">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
