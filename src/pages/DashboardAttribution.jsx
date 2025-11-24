import React, { useState } from 'react';
import { Building2, Save } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardAttribution = () => {
  const [content, setContent] = useState({
    missions: "La Direction Générale de l'Enseignement Supérieur (DGES) a pour mission de concevoir et de mettre en œuvre la politique du Gouvernement en matière d'enseignement supérieur...",
    organisation: "Elle est composée de services centraux et de services déconcentrés..."
  });

  const handleSave = () => {
    alert("Modifications enregistrées !");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-purple-600">
            <Building2 className="w-8 h-8" />
            Attribution & Organisation
          </h1>
          <p className="text-neutral-gray-dark mt-1">Éditez les textes de présentation de la DGES</p>
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg">
          <Save className="w-5 h-5" />
          Sauvegarder
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
            <h2 className="text-lg font-bold mb-4">Missions</h2>
            <textarea 
                className="w-full h-40 p-4 border border-neutral-gray-light rounded-xl focus:ring-2 focus:ring-purple-200 outline-none"
                value={content.missions}
                onChange={(e) => setContent({...content, missions: e.target.value})}
            />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-gray-light">
            <h2 className="text-lg font-bold mb-4">Organisation</h2>
            <textarea 
                className="w-full h-40 p-4 border border-neutral-gray-light rounded-xl focus:ring-2 focus:ring-purple-200 outline-none"
                value={content.organisation}
                onChange={(e) => setContent({...content, organisation: e.target.value})}
            />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAttribution;
