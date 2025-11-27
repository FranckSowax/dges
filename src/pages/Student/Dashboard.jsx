import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import StudentLayout from '../../components/Student/StudentLayout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';

const StudentDashboard = () => {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-50';
      case 'REJECTED': return 'text-red-600 bg-red-50';
      case 'UNDER_REVIEW': return 'text-blue-600 bg-blue-50';
      case 'INFO_REQUIRED': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'APPROVED': return 'Approuvé';
      case 'REJECTED': return 'Refusé';
      case 'UNDER_REVIEW': return 'En examen';
      case 'INFO_REQUIRED': return 'Info requise';
      case 'SUBMITTED': return 'Soumis';
      default: return 'Brouillon';
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-gabon-green to-gabon-blue rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Bonjour, {profile?.first_name} 👋
          </h2>
          <p className="opacity-90 text-lg">
            Bienvenue sur votre espace étudiant DGES. Suivez vos demandes en temps réel.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link 
              to="/etudiant/demandes/nouvelle" 
              className="bg-white text-gabon-green px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex items-center gap-2 inline-block"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Demande
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">{applications.length}</span>
            </div>
            <p className="text-neutral-gray-dark">Total Demandes</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">
                {applications.filter(a => ['SUBMITTED', 'UNDER_REVIEW'].includes(a.status)).length}
              </span>
            </div>
            <p className="text-neutral-gray-dark">En cours</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">
                {applications.filter(a => a.status === 'APPROVED').length}
              </span>
            </div>
            <p className="text-neutral-gray-dark">Approuvées</p>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
          <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center">
            <h3 className="font-bold text-lg text-neutral-black">Demandes Récentes</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-background">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Numéro</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-gray-dark">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-gray-dark">Statut</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-gray-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {loading ? (
                  <tr><td colSpan="5" className="p-8 text-center">Chargement...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-neutral-gray-dark">Aucune demande pour le moment</td></tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-neutral-background/50">
                      <td className="px-6 py-4 font-medium text-neutral-black">
                        {app.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-gray-dark font-mono">
                        {app.tracking_number || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-gray-dark">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gabon-green hover:underline text-sm font-medium">
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
