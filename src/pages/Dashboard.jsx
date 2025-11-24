import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, GraduationCap, FileText, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const Dashboard = () => {
  const stats = [
    {
      label: 'Universités',
      value: '4',
      icon: GraduationCap,
      color: 'bg-blue-500',
      trend: '+1 this month'
    },
    {
      label: 'Établissements Publics',
      value: '12',
      icon: Building2,
      color: 'bg-green-500',
      trend: 'Stable'
    },
    {
      label: 'Établissements Privés',
      value: '45',
      icon: Building2,
      color: 'bg-purple-500',
      trend: '+3 this month'
    },
    {
      label: 'Conventions',
      value: '16',
      icon: FileText,
      color: 'bg-orange-500',
      trend: '+2 this month'
    }
  ];

  const recentActivities = [
    {
      action: 'Mise à jour',
      target: 'USTM',
      user: 'Admin',
      time: 'Il y a 2 heures'
    },
    {
      action: 'Nouvelle convention',
      target: 'Accord UOB-France',
      user: 'Sarah M.',
      time: 'Il y a 5 heures'
    },
    {
      action: 'Modification',
      target: 'Page Organigramme',
      user: 'Admin',
      time: 'Hier'
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-black">Tableau de bord</h1>
        <p className="text-neutral-gray-dark">Bienvenue sur votre espace d'administration DGES</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-black mb-1">{stat.value}</h3>
            <p className="text-sm text-neutral-gray-dark">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
          <h2 className="text-lg font-bold text-neutral-black mb-6">Activité Récente</h2>
          <div className="space-y-6">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-gray-light flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-neutral-gray-dark">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-neutral-black font-medium">
                    <span className="text-gabon-green">{activity.user}</span> a effectué une {activity.action.toLowerCase()} sur <span className="font-bold">{activity.target}</span>
                  </p>
                  <span className="text-xs text-neutral-gray-dark">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
          <h2 className="text-lg font-bold text-neutral-black mb-6">Actions Rapides</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-gabon-green text-white rounded-xl text-sm font-medium hover:bg-gabon-green-dark transition-colors text-left flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              Ajouter un établissement
            </button>
            <button className="w-full py-3 px-4 bg-white border border-neutral-gray-light text-neutral-black rounded-xl text-sm font-medium hover:bg-neutral-gray-light transition-colors text-left flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Nouvelle convention
            </button>
            <button className="w-full py-3 px-4 bg-white border border-neutral-gray-light text-neutral-black rounded-xl text-sm font-medium hover:bg-neutral-gray-light transition-colors text-left flex items-center gap-3">
              <Users className="w-5 h-5" />
              Gérer les utilisateurs
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
