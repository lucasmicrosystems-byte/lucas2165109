import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  ShoppingBag, 
  Cloud, 
  Leaf, 
  Search, 
  BookOpen, 
  Phone,
  X 
} from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import logoImg from '../assets/logo.png';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();

  const menuItems = [
    { to: '/', name: t('nav_home'), icon: Home },
    { to: '/dashboard', name: t('nav_dashboard'), icon: LayoutDashboard },
    { to: '/search', name: t('nav_search'), icon: Search },
    { to: '/weather', name: t('nav_weather'), icon: Cloud },
    { to: '/scanner', name: t('nav_scanner'), icon: Leaf },
    { to: '/marketplace', name: t('nav_marketplace'), icon: ShoppingBag },
    { to: '/learning', name: t('nav_learning'), icon: BookOpen },
    { to: '/contact', name: t('nav_contact'), icon: Phone },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 bg-background border-r border-primary/10 transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/10 lg:hidden">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="AgriVerse Logo" className="w-7 h-7 object-contain rounded" />
            <span className="font-bold text-primary">{t('app_name')}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-primary/5 text-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-theme group
                  ${isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-primary/75 hover:bg-primary/5 hover:text-primary'
                  }
                `}
              >
                <Icon size={19} className="shrink-0 transition-transform group-hover:scale-105" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Quick Info */}
        <div className="p-4 border-t border-primary/10 text-center">
          <p className="text-[11px] font-semibold text-primary-light">AgriVerse Ecosystem v1.0</p>
          <p className="text-[10px] text-primary/40 mt-0.5">© 2026 Smart Farming Ecosystem</p>
        </div>
      </aside>
    </>
  );
}
