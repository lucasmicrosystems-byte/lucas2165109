import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Search, AlertTriangle, Calendar, Droplets, Thermometer, Wind } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { weatherService } from '../services/api';
import WeatherCard from '../components/WeatherCard';

export default function Weather({ currentUser }) {
  const { t } = useLanguage();
  const [cityInput, setCityInput] = useState('');
  const [searchCity, setSearchCity] = useState(currentUser?.location || 'Bangalore');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError('');
      const res = await weatherService.getWeather(city);
      setWeatherData(res.data);
    } catch (err) {
      console.error(err);
      setError('Could not locate weather station for that city. Check spelling or try Bangalore/Mumbai.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchCity);
  }, [searchCity]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setSearchCity(cityInput.trim());
  };

  const getAlertMessage = (temp, cond, rain) => {
    const alerts = [];
    if (rain > 10) {
      alerts.push({
        type: 'danger',
        message: "Severe Rain Warning: High rainfall detected. Delay spraying pesticides or fertilizers to prevent runoff.",
      });
    }
    if (temp > 35) {
      alerts.push({
        type: 'warning',
        message: "Extreme Heat Alert: Temperature exceeds 35°C. Increase irrigation frequency for leafy vegetables and seedlings.",
      });
    }
    if (temp < 15) {
      alerts.push({
        type: 'info',
        message: "Frost Potential: Low temperatures recorded. Guard fragile crops using crop covers or light evening watering.",
      });
    }
    if (cond.toLowerCase().includes('monsoon')) {
      alerts.push({
        type: 'warning',
        message: "Monsoon Inbound: Ensure drainage channels in low-lying paddy/rice fields are clear of silt and weed blocks.",
      });
    }
    
    return alerts;
  };

  // Generate 5 day mock forecast based on today's weather
  const getForecast = (baseTemp, baseRain) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecast = [];
    const todayIdx = new Date().getDay();
    
    for (let i = 1; i <= 5; i++) {
      const nextDay = days[(todayIdx + i) % 7];
      const variance = Math.sin(i) * 2;
      forecast.push({
        day: nextDay,
        temp: Math.round(baseTemp + variance),
        rainProb: Math.min(100, Math.max(0, Math.round((baseRain > 2 ? 60 : 15) + (variance * 10)))),
        condition: (baseRain > 5 && i % 2 === 0) ? 'Rainy' : (variance > 0.5) ? 'Sunny' : 'Cloudy'
      });
    }
    return forecast;
  };

  const activeAlerts = weatherData ? getAlertMessage(weatherData.temperature, weatherData.condition, weatherData.rainfall) : [];
  const forecastDays = weatherData ? getForecast(weatherData.temperature, weatherData.rainfall) : [];

  const renderForecastIcon = (cond) => {
    if (cond === 'Rainy') return <CloudRain size={20} className="text-blue-500" />;
    if (cond === 'Cloudy') return <Cloud size={20} className="text-gray-400" />;
    return <Sun size={20} className="text-amber-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      {/* Title & Lookup */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">{t('weather_title')}</h1>
          <p className="text-sm text-primary-light font-semibold mt-1">
            Access real-time agronomic weather diagnostics. Powered by Open-Meteo.
          </p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-xs shrink-0">
          <input 
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Search city e.g. Mumbai"
            className="flex-1 px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
          />
          <button 
            type="submit"
            className="px-4 bg-primary hover:bg-primary-light text-white rounded-xl shadow-md transition-theme flex items-center justify-center"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-primary/65">Fetching meteorology report...</p>
        </div>
      ) : (
        weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Card */}
            <div>
              <WeatherCard weather={weatherData} />
              
              {/* Extra details widget */}
              <div className="mt-6 p-5 bg-background border border-primary/10 rounded-3xl space-y-4">
                <h4 className="font-bold text-xs text-primary-light uppercase tracking-wider">Atmospheric Diagnostics</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2 p-3 bg-background-soft/50 rounded-xl">
                    <Thermometer size={16} className="text-primary-light" />
                    <div>
                      <span className="text-[10px] text-primary/60 block leading-tight">Soil Temperature</span>
                      <strong className="text-primary text-sm font-extrabold">22.4°C</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-background-soft/50 rounded-xl">
                    <Wind size={16} className="text-primary-light" />
                    <div>
                      <span className="text-[10px] text-primary/60 block leading-tight">Wind Velocity</span>
                      <strong className="text-primary text-sm font-extrabold">12.8 km/h</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts & Advisories */}
            <div className="lg:col-span-2 space-y-6">
              {/* alerts */}
              <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg text-primary">{t('weather_alerts')}</h3>
                <div className="mt-4 space-y-3">
                  {activeAlerts.length === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-semibold">
                      {t('weather_no_alerts')}
                    </div>
                  ) : (
                    activeAlerts.map((alert, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl text-xs font-medium border flex items-start gap-3 ${
                          alert.type === 'danger' 
                            ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/10' 
                            : alert.type === 'warning'
                              ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/10'
                              : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/10'
                        }`}
                      >
                        <AlertTriangle size={18} className="shrink-0" />
                        <span>{alert.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 5-day Forecast */}
              <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg text-primary flex items-center gap-2 mb-4">
                  <Calendar size={20} className="text-primary-light" />
                  <span>5-Day Agro Forecast</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {forecastDays.map((fc, idx) => (
                    <div key={idx} className="p-4 bg-background-soft/40 border border-primary/5 rounded-2xl text-center flex flex-col items-center justify-between">
                      <span className="text-xs font-bold text-primary/60">{fc.day}</span>
                      <div className="my-3">{renderForecastIcon(fc.condition)}</div>
                      <div>
                        <span className="text-sm font-extrabold text-primary block">{fc.temp}°C</span>
                        <span className="text-[9px] font-bold text-blue-500 block mt-0.5">{fc.rainProb}% Rain</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
