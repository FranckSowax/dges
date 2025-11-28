import React, { useState } from 'react';
import { Upload, X, Loader, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const GalleryUpload = ({ images = [], onUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newUrls = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }
      
      onUpdate([...images, ...newUrls]);
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    onUpdate(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
        Galerie Photos (Optionnel)
      </label>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-neutral-gray-light">
            <img src={url} alt={`Galerie ${index}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <label className="border-2 border-dashed border-neutral-gray-light rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gabon-yellow hover:bg-yellow-50 transition-colors">
          {uploading ? (
            <Loader className="w-6 h-6 text-gabon-yellow animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-neutral-gray-dark mb-2" />
              <span className="text-xs text-neutral-gray-dark text-center px-2">Ajouter photos</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};

export default GalleryUpload;
