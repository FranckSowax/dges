import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Phone, Mail, Globe, ExternalLink, Edit, GraduationCap, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const EstablishmentsList = ({ 
  type, // 'Public', 'Privé', 'RUP', 'Inter-État', 'Université'
  title,
  subtitle,
  heroGradient = 'from-gabon-green via-gabon-blue to-gabon-green',
  dashboardPath = '/dashboard/etablissements'
}) => {
  const navigate = useNavigate();
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  useEffect(() => {
    fetchEstablishments();
  }, [type]);

  const fetchEstablishments = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('establishments')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      // Filter by type if specified
      if (type && type !== 'all') {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;
      setEstablishments(data || []);
    } catch (error) {
      console.error('Erreur chargement établissements:', error);
      setEstablishments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEstablishments = establishments.filter(est =>
    est.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.acronym?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by sub-type if needed
  const groupedEstablishments = filteredEstablishments.reduce((acc, est) => {
    const subType = est.sub_type || est.type || 'Autres';
    if (!acc[subType]) acc[subType] = [];
    acc[subType].push(est);
    return acc;
  }, {});

  const EstablishmentCard = ({ establishment }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedEstablishment(establishment)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 cursor-pointer"
    >
      {/* Image/Logo */}
      <div className="relative w-[calc(100%-32px)] mx-auto mt-4 pt-[60%] rounded-2xl overflow-hidden bg-gradient-to-br from-gabon-green/10 to-gabon-blue/10">
        {establishment.logo_url ? (
          <img 
            src={establishment.logo_url} 
            alt={establishment.name}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-gabon-green/20">
              {establishment.acronym?.substring(0, 3) || establishment.name.substring(0, 3)}
            </span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold text-gabon-green uppercase tracking-wide">
            {establishment.type}
          </span>
        </div>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(dashboardPath);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gabon-green hover:text-white"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-black mb-1 line-clamp-2 leading-tight">
          {establishment.name}
        </h3>
        <p className="text-gabon-green font-semibold mb-3">
          {establishment.acronym}
        </p>

        {establishment.description && (
          <p className="text-neutral-gray-dark text-sm mb-4 line-clamp-2">
            {establishment.description}
          </p>
        )}

        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray-dark">
          {establishment.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{establishment.address.split(',')[0]}</span>
            </div>
          )}
          {establishment.director && (
            <div className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span className="truncate max-w-[150px]">{establishment.director}</span>
            </div>
          )}
        </div>

        {/* Website Button */}
        {establishment.website_url && (
          <a
            href={establishment.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 w-full py-3 px-4 bg-neutral-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gabon-green transition-all duration-300 text-sm"
          >
            Visiter le site
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );

  // Modal for establishment details
  const EstablishmentModal = ({ establishment, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-gabon-green to-gabon-blue">
          {establishment.logo_url && (
            <img 
              src={establishment.logo_url} 
              alt={establishment.name}
              className="absolute inset-0 w-full h-full object-contain p-8 opacity-30"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold rounded-full mb-2">
              {establishment.type}
            </span>
            <h2 className="text-2xl font-bold">{establishment.name}</h2>
            <p className="text-white/80 font-medium">{establishment.acronym}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-192px)]">
          {establishment.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-black mb-2">Description</h3>
              <p className="text-neutral-gray-dark">{establishment.description}</p>
            </div>
          )}

          {establishment.director && (
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Directeur / Responsable</p>
                <p className="font-medium text-neutral-black">{establishment.director}</p>
              </div>
            </div>
          )}

          {establishment.address && (
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Adresse</p>
                <p className="font-medium text-neutral-black">{establishment.address}</p>
              </div>
            </div>
          )}

          {establishment.phone && (
            <div className="mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Téléphone</p>
                <p className="font-medium text-neutral-black">{establishment.phone}</p>
              </div>
            </div>
          )}

          {establishment.email && (
            <div className="mb-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gabon-green" />
              <div>
                <p className="text-sm text-neutral-gray-dark">Email</p>
                <a href={`mailto:${establishment.email}`} className="font-medium text-gabon-green hover:underline">
                  {establishment.email}
                </a>
              </div>
            </div>
          )}

          {establishment.filieres && establishment.filieres.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-black mb-3">Filières</h3>
              <div className="flex flex-wrap gap-2">
                {establishment.filieres.map((filiere, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gabon-green/10 text-gabon-green text-sm rounded-full">
                    {filiere}
                  </span>
                ))}
              </div>
            </div>
          )}

          {establishment.website_url && (
            <a
              href={establishment.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-gabon-green text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gabon-green-dark transition-all duration-300"
            >
              <Globe className="w-5 h-5" />
              Visiter le site web
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Hero Header */}
      <section className={`pt-32 pb-20 bg-gradient-to-r ${heroGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 font-light">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="text"
                placeholder="Rechercher un établissement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex justify-center"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-gabon-green mb-1">
                {filteredEstablishments.length}
              </div>
              <div className="text-neutral-gray-dark">
                Établissement{filteredEstablishments.length > 1 ? 's' : ''} {type !== 'all' ? type.toLowerCase() + 's' : ''}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Establishments Grid */}
      <section className="pb-20">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader className="w-10 h-10 text-gabon-green animate-spin" />
            </div>
          ) : filteredEstablishments.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-gray-dark">Aucun établissement trouvé</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEstablishments.map((establishment) => (
                <EstablishmentCard key={establishment.id} establishment={establishment} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedEstablishment && (
          <EstablishmentModal 
            establishment={selectedEstablishment} 
            onClose={() => setSelectedEstablishment(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EstablishmentsList;
