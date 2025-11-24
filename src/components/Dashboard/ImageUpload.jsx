import React, { useState } from 'react';
import { Upload, X, Loader, Image as ImageIcon, Video } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const MediaUpload = ({ onUpload, defaultUrl, label = "Média", bucket = "images", accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultUrl || '');
  const isVideo = preview?.match(/\.(mp4|webm|ogg)$/i) || accept.includes('video');

  const handleUpload = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner un fichier à uploader.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreview(data.publicUrl);
      onUpload(data.publicUrl, file.type.startsWith('video/') ? 'video' : 'image');

    } catch (error) {
      console.error('Erreur upload:', error.message);
      alert('Erreur lors de l\'upload du média');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUpload('', '');
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">{label}</label>
      
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-neutral-gray-light group bg-neutral-background">
          {isVideo ? (
            <video 
              src={preview} 
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
              title="Supprimer le média"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-neutral-gray-light rounded-xl cursor-pointer bg-neutral-background hover:bg-neutral-gray-light/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader className="w-8 h-8 text-gabon-blue animate-spin mb-2" />
              ) : (
                accept.includes('video') ? (
                  <Video className="w-8 h-8 text-neutral-gray-dark mb-2" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-neutral-gray-dark mb-2" />
                )
              )}
              <p className="text-xs text-neutral-gray-dark">
                {uploading ? 'Upload en cours...' : 'Cliquez pour uploader'}
              </p>
              <p className="text-[10px] text-neutral-gray-dark mt-1">
                {accept.includes('video') ? 'MP4, WebM (max 50MB)' : 'PNG, JPG (max 2MB)'}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept={accept}
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
