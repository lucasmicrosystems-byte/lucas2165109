import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Globe, LogOut, User, Menu, Mic } from 'lucide-react';
import { useTheme } from '../hooks/ThemeContext';
import { useLanguage } from '../hooks/LanguageContext';

import logoImg from '../assets/logo.png';

export default function Navbar({ onToggleSidebar, currentUser, onLogout, onToggleGlobalMic, globalMicListening }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background-soft/80 backdrop-blur-md border-b border-primary/10 transition-theme shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="p-2 mr-1 rounded-lg hover:bg-primary/5 lg:hidden text-primary transition-theme"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          {/* User Provided Logo Image Asset */}
          <img src={logoImg} alt="AgriVerse Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm" />
          <div>
            <span className="text-xl font-bold tracking-tight text-primary block leading-none">{t('app_name')}</span>
            <span className="text-xs text-primary-light font-medium">{t('tagline')}</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selection */}
        <div className="relative flex items-center gap-1 text-primary">
          <Globe size={18} className="opacity-70" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent font-medium border-none focus:ring-0 cursor-pointer pr-4 text-sm"
          >
            <option value="en" className="text-gray-800">English</option>
            <option value="hi" className="text-gray-800">हिन्दी</option>
            <option value="te" className="text-gray-800">తెలుగు</option>
            <option value="ta" className="text-gray-800">தமிழ் (Tamil)</option>
            <option value="kn" className="text-gray-800">ಕನ್ನಡ (Kannada)</option>
            <option value="mr" className="text-gray-800">मराठी (Marathi)</option>
            <option value="bn" className="text-gray-800">বাংলা (Bengali)</option>
          </select>
        </div>

        {/* Global Mic Search Button */}
        {onToggleGlobalMic && (
          <button 
            onClick={onToggleGlobalMic}
            className={`p-2.5 rounded-xl hover:scale-105 transition-transform ${globalMicListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-primary/5 text-primary'}`}
            title="Global Voice Command"
          >
            <Mic size={20} />
          </button>
        )}

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-primary/5 text-primary transition-theme"
          title={theme === 'organic' ? t('theme_tech') : t('theme_organic')}
        >
          {theme === 'organic' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* User Info & Authentication */}
        {currentUser ? (
          <div className="flex items-center gap-3 border-l border-primary/15 pl-4">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-primary-light block font-semibold">{t('btn_login')}</span>
              <span className="text-sm font-bold text-primary">{currentUser.farmer_name}</span>
            </div>
            <button 
              onClick={() => {
                onLogout();
                navigate('/');
              }}
              className="p-2.5 rounded-xl text-accent-dark hover:bg-accent-dark/5 transition-theme"
              title={t('btn_logout')}
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link 
            to="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-light rounded-xl shadow-md transition-theme"
          >
            <User size={16} />
            <span>{t('btn_login')}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
