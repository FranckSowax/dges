import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import ImageUpload from './ImageUpload';

const EstablishmentForm = ({ establishment, type, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    description: '',
    type: type || 'Public',
    logo_url: '',
    website_url: '',
    address: '',
    phone: '',
    email: '',
    director: '',
    filieres: '' // Comma separated
  });

  useEffect(() => {
    if (establishment) {
      setFormData({
        name: establishment.name || '',
        acronym: establishment.acronym || '',
        description: establishment.description || '',
        type: establishment.type || type || 'Public',
        logo_url: establishment.logo_url || '',
        website_url: establishment.website_url || '',
        address: establishment.address || '',
        phone: establishment.phone || '',
        email: establishment.email || '',
        director: establishment.director || '',
        filieres: Array.isArray(establishment.filieres) ? establishment.filieres.join(', ') : (establishment.filieres || '')
      });
    }
  }, [establishment, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, logo_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Format filieres to array
      const dataToSave = {
        ...formData,
        filieres: formData.filieres.split(',').map(f => f.trim()).filter(f => f)
      };

      let result;
      if (establishment?.id) {
        // Update
        const { data, error } = await supabase
          .from('establishments')
          .update(dataToSave)
          .eq('id', establishment.id)
          .select();
          
        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Aucune donnée retournée après la mise à jour');
        result = data[0];
      } else {
        // Create
        const { data, error } = await supabase
          .from('establishments')
          .insert([dataToSave])
          .select();
          
        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Aucune donnée retournée après la création');
        result = data[0];
      }
      
      if (result) {
        onSave(result);
        onClose();
      } else {
        throw new Error('Erreur inattendue: résultat vide');
      }
    } catch (error) {
      console.error('Error saving establishment:', error);
      alert('Erreur lors de l\'enregistrement: ' + (error.message || 'Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-neutral-gray-light flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-neutral-black">
            {establishment ? 'Modifier' : 'Ajouter'} un établissement
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-gray-light rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Nom de l'établissement</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Acronyme</label>
              <input
                type="text"
                name="acronym"
                required
                value={formData.acronym}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              >
                <option value="Université">Université</option>
                <option value="Institut">Institut</option>
                <option value="Grande École">Grande École</option>
                <option value="Centre Universitaire">Centre Universitaire</option>
                <option value="Public">Public</option>
                <option value="Privé">Privé</option>
                <option value="RUP">RUP</option>
                <option value="Inter-État">Inter-État</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Directeur / Responsable</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Adresse</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Site Web URL</label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <ImageUpload 
                onUpload={handleImageUpload}
                defaultImage={formData.logo_url}
                label="Logo de l'établissement"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Filières (séparées par des virgules)</label>
              <textarea
                name="filieres"
                rows="2"
                value={formData.filieres}
                onChange={handleChange}
                placeholder="Droit, Économie, Informatique..."
                className="w-full px-4 py-2 rounded-lg border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-neutral-gray-light">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-neutral-gray-dark hover:bg-neutral-gray-light transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gabon-green text-white hover:bg-gabon-green-dark transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstablishmentForm;
