import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-primary">{t('contact_title')}</h1>
        <p className="text-sm text-primary-light font-semibold mt-1">
          Have questions about market listings, disease diagnosis, or need technical help? Connect with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Contact Form Column */}
        <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-primary">Send Us a Message</h3>
            
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{t('contact_success')}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary">{t('contact_name')} *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-primary">{t('contact_email')} *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-primary">{t('contact_msg')} *</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry..."
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-theme flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>{t('contact_send')}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info & Map Placeholder Column */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Info widget */}
          <div className="p-6 bg-background border border-primary/10 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg text-primary">AgriVerse Hub Directory</h3>
            
            <div className="space-y-3.5 text-xs text-primary/80">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-light shrink-0" />
                <div>
                  <strong className="text-primary block font-bold">Bangalore AgriTech Hub (HQ)</strong>
                  <span className="block leading-relaxed mt-0.5">3rd Floor, Krishi Bhawan, Hudson Circle, Bengaluru, KA - 560001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-light shrink-0" />
                <div>
                  <strong className="text-primary block font-bold">Mumbai Rural Development Center</strong>
                  <span className="block leading-relaxed mt-0.5">Plot 12, APMC Market Yard, Vashi, Navi Mumbai, MH - 400703</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-primary/5">
                <Phone size={16} className="text-primary-light shrink-0" />
                <span>Helpline: +91 1800 123 4567 (Toll-Free, 9 AM - 6 PM)</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary-light shrink-0" />
                <span>Support Email: help@agriverse.com</span>
              </div>
            </div>
          </div>

          {/* Map Display Canvas */}
          <div className="flex-1 min-h-[220px] p-5 bg-background border border-primary/10 rounded-3xl flex flex-col justify-between">
            <h4 className="font-bold text-xs text-primary-light uppercase tracking-wider">Geographic Support Coverage</h4>
            
            {/* Visual SVG Map mockup */}
            <div className="flex-1 flex items-center justify-center py-4 bg-background-soft/30 rounded-2xl border border-primary/5 mt-3 overflow-hidden relative">
              <svg viewBox="0 0 300 150" className="w-full h-full text-primary-light/15">
                {/* India abstract map path grid */}
                <path d="M120,20 C150,10 180,30 190,50 C200,70 170,110 150,130 C130,120 100,100 90,80 C80,60 100,30 120,20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Bangalore Hub Pin */}
                <g className="text-red-500 cursor-pointer hover:scale-110 transition-transform">
                  <circle cx="140" cy="110" r="5" fill="currentColor" className="animate-ping" />
                  <circle cx="140" cy="110" r="4" fill="currentColor" />
                  <text x="150" y="114" className="text-[9px] font-black text-primary fill-current">Bangalore Hub</text>
                </g>

                {/* Mumbai Hub Pin */}
                <g className="text-blue-500 cursor-pointer hover:scale-110 transition-transform">
                  <circle cx="115" cy="78" r="5" fill="currentColor" className="animate-ping" style={{ animationDelay: '500ms' }} />
                  <circle cx="115" cy="78" r="4" fill="currentColor" />
                  <text x="125" y="82" className="text-[9px] font-black text-primary fill-current">Mumbai Hub</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
