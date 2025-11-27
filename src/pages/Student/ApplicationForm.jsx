import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Send, Loader, Paperclip } from 'lucide-react';
import StudentLayout from '../../components/Student/StudentLayout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';

const ApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    type: 'BOURSE',
    birthCity: '',
    nationality: 'Gabonaise',
    address: '',
    lastSchool: '',
    diploma: '',
    averageGrade: '',
    desiredUniversity: '',
    program: ''
  });

  const handleSubmit = async (status = 'DRAFT') => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          type: formData.type,
          status: status,
          data: formData,
          tracking_number: `DGES-${Date.now().toString().slice(-6)}`
        });

      if (error) throw error;

      navigate('/etudiant/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Erreur lors de la soumission');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-black mb-2">Nouvelle Demande de Bourse</h1>
          <p className="text-neutral-gray-dark">Remplissez le formulaire ci-dessous pour soumettre votre dossier.</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center mb-8">
          <div className={`flex-1 h-2 rounded-l-full ${activeStep >= 1 ? 'bg-gabon-green' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-2 ${activeStep >= 2 ? 'bg-gabon-green' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-2 rounded-r-full ${activeStep >= 3 ? 'bg-gabon-green' : 'bg-gray-200'}`}></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit('SUBMITTED'); }}>
            
            {/* Personal Info */}
            <section>
              <h3 className="font-bold text-lg mb-4 text-neutral-black border-b pb-2">Informations Personnelles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Ville de naissance</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.birthCity}
                    onChange={e => setFormData({...formData, birthCity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Nationalité</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.nationality}
                    onChange={e => setFormData({...formData, nationality: e.target.value})}
                  >
                    <option value="Gabonaise">Gabonaise</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Adresse complète</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Academic Info */}
            <section className="pt-4">
              <h3 className="font-bold text-lg mb-4 text-neutral-black border-b pb-2">Parcours Académique</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Dernier établissement</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.lastSchool}
                    onChange={e => setFormData({...formData, lastSchool: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Dernier diplôme obtenu</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.diploma}
                    onChange={e => setFormData({...formData, diploma: e.target.value})}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="BAC">Baccalauréat</option>
                    <option value="LICENCE">Licence</option>
                    <option value="MASTER">Master</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Moyenne générale (/20)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.averageGrade}
                    onChange={e => setFormData({...formData, averageGrade: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Future Plans */}
            <section className="pt-4">
              <h3 className="font-bold text-lg mb-4 text-neutral-black border-b pb-2">Projet d'Études</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Université souhaitée</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.desiredUniversity}
                    onChange={e => setFormData({...formData, desiredUniversity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Filière / Programme</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none"
                    value={formData.program}
                    onChange={e => setFormData({...formData, program: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-neutral-gray-light mt-8">
              <button
                type="button"
                onClick={() => handleSubmit('DRAFT')}
                disabled={submitting}
                className="px-6 py-3 rounded-xl font-medium text-neutral-gray-dark hover:bg-neutral-background transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Enregistrer le brouillon
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-gabon-green text-white px-8 py-3 rounded-xl font-bold hover:bg-gabon-green-dark transition-colors flex items-center gap-2"
              >
                {submitting ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Soumettre le dossier
              </button>
            </div>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ApplicationForm;
