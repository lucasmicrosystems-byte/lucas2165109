import React from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Droplets, CloudDrizzle } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function WeatherCard({ weather }) {
  const { t } = useLanguage();
  if (!weather) return null;

  const getConditionIcon = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('monsoon')) return <CloudRain size={44} className="text-blue-500 animate-pulse" />;
    if (cond.includes('cloud')) return <Cloud size={44} className="text-gray-400" />;
    if (cond.includes('drizzle')) return <CloudDrizzle size={44} className="text-sky-400" />;
    return <Sun size={44} className="text-amber-500 animate-spin" style={{ animationDuration: '30s' }} />;
  };

  const getCardGradient = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('monsoon')) {
      return 'from-blue-50/50 to-sky-100/30 dark:from-slate-900 dark:to-blue-950/20';
    }
    return 'from-amber-50/50 to-orange-100/20 dark:from-slate-900 dark:to-amber-950/10';
  };

  return (
    <div className={`p-6 rounded-3xl bg-gradient-to-br ${getCardGradient(weather.condition)} border border-primary/10 transition-theme shadow-md flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider">Live Weather</span>
          <h3 className="text-2xl font-bold text-primary mt-0.5">{weather.city}</h3>
          <p className="text-sm font-semibold text-primary/75 capitalize mt-1">{weather.condition}</p>
        </div>
        <div className="p-3 bg-background border border-primary/5 rounded-2xl shadow-sm">
          {getConditionIcon(weather.condition)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/5">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center text-primary-light gap-1 mb-1">
            <Thermometer size={16} />
            <span className="text-[10px] font-bold uppercase">Temp</span>
          </div>
          <span className="text-lg font-extrabold text-primary">{Math.round(weather.temperature)}°C</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center text-primary-light gap-1 mb-1">
            <Droplets size={16} />
            <span className="text-[10px] font-bold uppercase">{t('weather_humidity')}</span>
          </div>
          <span className="text-lg font-extrabold text-primary">{Math.round(weather.humidity)}%</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center text-primary-light gap-1 mb-1">
            <CloudRain size={16} />
            <span className="text-[10px] font-bold uppercase">{t('weather_rainfall')}</span>
          </div>
          <span className="text-lg font-extrabold text-primary">{weather.rainfall.toFixed(1)}mm</span>
        </div>
      </div>
      
      {weather.timestamp && (
        <span className="text-[10px] text-primary/40 block mt-4 text-center">
          Updated: {new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </div>
  );
}
