import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName
      });
      // Supabase envoie un mail de confirmation par défaut, mais on peut rediriger vers une page de succès
      alert("Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre inscription.");
      navigate('/auth/login');
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-black mb-2">Inscription</h1>
          <p className="text-neutral-gray-dark">Rejoignez la plateforme numérique DGES</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
                Nom
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="password"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                placeholder="Minimum 6 caractères"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-dark" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                placeholder="Répétez le mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gabon-green text-white py-3 rounded-xl font-medium hover:bg-gabon-green-dark transition-colors flex items-center justify-center mt-6"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                S'inscrire
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-gray-dark">
          Déjà un compte ?{' '}
          <Link to="/auth/login" className="text-gabon-green font-medium hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
