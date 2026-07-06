import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-6 bg-background-soft border-t border-primary/10 transition-theme mt-auto text-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg">{t('app_name')}</h3>
          <p className="text-sm text-primary/75 mt-2 max-w-sm">
            {t('hero_subtitle')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-light">Useful Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary/85">
            <li><a href="/learning" className="hover:underline">Organic Farming Tips</a></li>
            <li><a href="/weather" className="hover:underline">Weather Forecast Station</a></li>
            <li><a href="/scanner" className="hover:underline">Plant Diseases Database</a></li>
            <li><a href="/marketplace" className="hover:underline">Local Market Rates</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-light">Government Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary/85">
            <li><a href="#subsidy" className="hover:underline">PM-KISAN Scheme Alerts</a></li>
            <li><a href="#sub" className="hover:underline">Soil Health Card Subsidies</a></li>
            <li><a href="#loan" className="hover:underline">Crop Insurance Policy Info</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-primary/5 text-center text-xs text-primary/50">
        &copy; {new Date().getFullYear()} AgriVerse – Smart Farming Ecosystem. All rights reserved. Supported by AgTech Research Lab.
      </div>
    </footer>
  );
}
