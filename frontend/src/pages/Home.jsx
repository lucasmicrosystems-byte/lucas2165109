import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, CloudRain, ShoppingBag, BookOpen, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { label: "Active Farmers Joined", value: "2,400+" },
    { label: "AI Leaf Diagnostics", value: "15,000+" },
    { label: "Local Trade Volume", value: "₹8.4 Lakhs" },
    { label: "Crop Suitability Match", value: "98.2%" }
  ];

  const faqs = [
    { q: "How does the AI Leaf Disease Scanner work?", a: "Simply take a picture of an infected leaf (like tomato or rice) and upload it. Our AI model analyzes the visual features to identify the disease and suggests both organic and chemical remedies." },
    { q: "Can I sell my crop yields directly on AgriVerse?", a: "Yes! Use the Marketplace tab, click 'List Your Product', fill in the details, price, and your contact info. Nearby farmers or traders can buy directly from you." },
    { q: "Which languages are supported?", a: "Currently, AgriVerse supports English, Telugu (తెలుగు), and Hindi (हिन्दी) to make smart farming accessible to regional farmers." },
    { q: "Where does the weather forecast data come from?", a: "We integrate with live meteorological weather stations (via Open-Meteo API) to fetch true location-based temperatures, rain indexes, and farming warnings." }
  ];

  return (
    <div className="space-y-16 py-6 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="relative p-8 md:p-14 bg-gradient-to-r from-primary to-primary-light text-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <span className="px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider rounded-full inline-block">
            Smart Agriculture Ecosystem
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/scanner" 
              className="px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-accent-dark transition-theme shadow-md flex items-center gap-2"
            >
              <Leaf size={18} />
              <span>{t('action_scan')}</span>
            </Link>
            <Link 
              to="/marketplace" 
              className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-theme"
            >
              {t('action_market')}
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3 max-w-sm flex items-center justify-center shrink-0">
          {/* Beautiful SVG mockup of a smart farmer phone */}
          <svg viewBox="0 0 200 200" className="w-full h-auto text-accent max-h-[220px]">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9c74f" />
                <stop offset="100%" stopColor="#f9844a" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#grad)" opacity="0.1" />
            <path d="M70,120 L90,140 L130,80" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="130" cy="80" r="10" fill="#f9844a" />
            <path d="M50,70 Q70,50 100,50" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 4" />
          </svg>
        </div>
      </header>

      {/* Stats Counter Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 bg-background border border-primary/10 rounded-2xl shadow-sm text-center">
            <span className="text-3xl font-extrabold text-primary block">{stat.value}</span>
            <span className="text-xs font-semibold text-primary-light block mt-1">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Quick Actions Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">{t('quick_start')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/scanner" className="p-6 bg-background border border-primary/10 rounded-2xl hover:shadow-lg transition-theme flex items-start gap-4">
            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
              <Leaf size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">{t('nav_scanner')}</h3>
              <p className="text-xs text-primary/70 mt-1">Upload leaf photos to scan for plant diseases.</p>
            </div>
          </Link>

          <Link to="/marketplace" className="p-6 bg-background border border-primary/10 rounded-2xl hover:shadow-lg transition-theme flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">{t('nav_marketplace')}</h3>
              <p className="text-xs text-primary/70 mt-1">Direct buy/sell of seeds, tools, and farm produce.</p>
            </div>
          </Link>

          <Link to="/weather" className="p-6 bg-background border border-primary/10 rounded-2xl hover:shadow-lg transition-theme flex items-start gap-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <CloudRain size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">{t('nav_weather')}</h3>
              <p className="text-xs text-primary/70 mt-1">Check location forecasts, rain index and farm alerts.</p>
            </div>
          </Link>

          <Link to="/learning" className="p-6 bg-background border border-primary/10 rounded-2xl hover:shadow-lg transition-theme flex items-start gap-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
              <BookOpen size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">{t('nav_learning')}</h3>
              <p className="text-xs text-primary/70 mt-1">Read organic farming methods and video tutorials.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Website Introduction */}
      <section className="p-8 bg-background-soft rounded-3xl flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-extrabold text-primary">{t('intro_title')}</h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            {t('intro_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {[
              "Locally sourced marketplace items",
              "Real-time Open-Meteo forecasts",
              "Task checklist for schedule tracking",
              "Immediate disease diagnostic remedies"
            ].map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-primary font-medium">
                <CheckCircle2 size={16} className="text-primary-light shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 shrink-0 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d159687c2f?auto=format&fit=crop&w=400&q=80" 
            alt="Farm Field" 
            className="w-full h-48 lg:h-64 object-cover rounded-2xl shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">{t('faq_title')}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group p-5 bg-background border border-primary/10 rounded-2xl cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between text-sm font-bold text-primary">
                <span>{faq.q}</span>
                <ChevronDown size={18} className="transition-transform group-open:rotate-180 text-primary-light" />
              </summary>
              <p className="text-xs text-primary/75 mt-3 leading-relaxed border-t border-primary/5 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
