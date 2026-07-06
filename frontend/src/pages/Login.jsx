import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Globe, Loader, AlertCircle } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { authService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register Fields
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [language, setLanguage] = useState('English');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setError('');
      if (isRegister) {
        if (!farmerName) {
          setError('Please fill in your name.');
          setLoading(false);
          return;
        }
        const res = await authService.register(farmerName, email, location, language, password);
        onLoginSuccess(res.data);
      } else {
        const res = await authService.login(email, password);
        onLoginSuccess(res.data);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Authentication service error. Verify the backend API server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="p-8 bg-background border border-primary/10 rounded-3xl shadow-xl space-y-6 transition-theme">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-xl shadow-md">
            AV
          </div>
          <h2 className="text-2xl font-extrabold text-primary">
            {isRegister ? "Create Farmer Profile" : t('btn_login')}
          </h2>
          <p className="text-xs text-primary/60 font-semibold leading-relaxed">
            {isRegister 
              ? "Join AgriVerse to schedule tasks and access live regional agricultural tools." 
              : "Access your dashboard, farm logs, and trade items."
            }
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">Farmer Name *</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-primary/45" />
                <input 
                  type="text" 
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Ramesh Gowda"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary">Email Address *</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3.5 text-primary/45" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@agriverse.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                required
              />
            </div>
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary">Location *</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-3.5 text-primary/45" />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ludhiana, Punjab"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-primary">Language</label>
                <div className="relative">
                  <Globe size={15} className="absolute left-3 top-3.5 text-primary/45" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी</option>
                    <option value="Telugu">తెలుగు</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary">Secret Password *</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3.5 text-primary/45" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-theme flex items-center justify-center gap-1.5"
          >
            {loading && <Loader size={15} className="animate-spin" />}
            <span>{isRegister ? "Register New Profile" : "Sign In to Farm"}</span>
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center pt-2 text-xs font-bold">
          <button 
            onClick={() => setIsRegister((prev) => !prev)}
            className="text-primary-light hover:underline"
          >
            {isRegister 
              ? "Already have a profile? Sign In" 
              : "First time here? Register Profile"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
