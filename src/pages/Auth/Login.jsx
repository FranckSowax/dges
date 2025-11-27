import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(formData.email, formData.password);
      navigate('/etudiant/dashboard');
    } catch (err) {
      setError(err.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-black mb-2">Connexion</h1>
          <p className="text-neutral-gray-dark">Accédez à votre espace étudiant</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gabon-green text-white py-3 rounded-xl font-medium hover:bg-gabon-green-dark transition-colors flex items-center justify-center"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Se connecter
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-gray-dark">
          Pas encore de compte ?{' '}
          <Link to="/auth/register" className="text-gabon-green font-medium hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
