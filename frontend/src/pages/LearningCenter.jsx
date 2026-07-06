import React, { useState } from 'react';
import { BookOpen, Play, Video, ChevronRight, Award, Compass } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function LearningCenter() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    {
      title: "Vermicomposting: Build Your Organic Fertilizer",
      category: "Organic Farming",
      duration: "10 mins read",
      summary: "Learn how to use red wiggler earthworms to recycle kitchen scraps and dry leaves into nutrient-rich vermicompost to fortify soil structures.",
      steps: [
        "Select a shallow container (aerated plastic bin or wooden box).",
        "Add a 3-inch bedding layer of shredded cardboard or dry leaves, then dampen it.",
        "Introduce red wiggler worms (about 500g for a standard bin).",
        "Bury food scraps (vegetable peels, coffee grounds) under the bedding weekly.",
        "Harvest dark, earthy worm castings in 3-4 months."
      ]
    },
    {
      title: "Crop Rotation Strategies for Drylands",
      category: "Soil Health",
      duration: "12 mins read",
      summary: "Alternating grain millets with nitrogen-fixing pulses prevents soil nutrient depletion and breaks pest life cycles naturally.",
      steps: [
        "Year 1: Grow heavy feeders like Maize or Sorghum.",
        "Year 2: Plant legumes (Tur Dal, Groundnut) to fix atmospheric nitrogen.",
        "Year 3: Cultivate shallow-rooted vegetables like Tomatoes or Chilli.",
        "Year 4: Grow cover crops or let the land lay fallow."
      ]
    },
    {
      title: "Natural Insecticide Formulation: Neem Oil Spray",
      category: "Pest Management",
      duration: "8 mins read",
      summary: "Formulate your organic broad-spectrum pest control liquid to deter aphids, whiteflies, and spider mites without chemical residue.",
      steps: [
        "Mix 1 liter of warm water with 1 teaspoon of organic liquid dish soap.",
        "Add 2 teaspoons (approx. 10ml) of high-quality cold-pressed neem oil.",
        "Shake vigorously until emulsified.",
        "Spray foliage thoroughly, coating both tops and undersides of leaves.",
        "Reapply every 7-14 days or after rain showers."
      ]
    }
  ];

  const videos = [
    {
      title: "Setting Up Drip Irrigation on a 2-Acre Farm",
      views: "12K views",
      duration: "14:20",
      thumbnail: "https://images.unsplash.com/photo-1463171359079-3d19a6be17b6?auto=format&fit=crop&w=350&q=80",
      channel: "Smart Agro Tech"
    },
    {
      title: "Direct Mulching Methods to Double Tomato Yields",
      views: "24K views",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=350&q=80",
      channel: "Farming Science"
    },
    {
      title: "Harvesting Alphonso Mangoes: Best Export Practices",
      views: "8.5K views",
      duration: "11:10",
      thumbnail: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=350&q=80",
      channel: "Konkan Agro Network"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Agronomy Learning Center</h1>
        <p className="text-sm text-primary-light font-semibold mt-1">
          Expand your knowledge with vetted tutorials, scientific methods, and organic farming video courses.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-primary/10">
        <button 
          onClick={() => setActiveTab('tutorials')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-theme flex items-center gap-2 ${
            activeTab === 'tutorials'
              ? 'border-primary text-primary'
              : 'border-transparent text-primary/60 hover:text-primary'
          }`}
        >
          <BookOpen size={16} />
          <span>Articles & Handbooks</span>
        </button>
        <button 
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-theme flex items-center gap-2 ${
            activeTab === 'videos'
              ? 'border-primary text-primary'
              : 'border-transparent text-primary/60 hover:text-primary'
          }`}
        >
          <Video size={16} />
          <span>Video Tutorials</span>
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'tutorials' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            {tutorials.map((tut, idx) => (
              <article 
                key={idx}
                className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-theme"
              >
                <div className="flex items-center gap-3.5">
                  <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-primary-light rounded-lg">
                    {tut.category}
                  </span>
                  <span className="text-xs text-primary/50 font-bold">{tut.duration}</span>
                </div>
                
                <h3 className="text-xl font-extrabold text-primary">{tut.title}</h3>
                <p className="text-xs text-primary/75 leading-relaxed">{tut.summary}</p>
                
                <div className="pt-4 border-t border-primary/5 space-y-2">
                  <span className="text-xs font-extrabold text-primary-light uppercase tracking-wider block">Step-by-Step Guide</span>
                  <ol className="list-decimal pl-4 text-xs text-primary/80 space-y-1.5 font-medium">
                    {tut.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column (Side Tips) */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-primary to-primary-light text-white rounded-3xl space-y-4 shadow-md">
              <Award className="text-accent" size={32} />
              <h4 className="font-extrabold text-lg">Earn Organic Certification</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Transitioning to organic practices increases market value. Keep crop logs, utilize organic certified seeds from our marketplace, and access state subsidies.
              </p>
              <button className="w-full py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold text-xs rounded-xl shadow-md transition-theme">
                View Requirements
              </button>
            </div>

            <div className="p-6 bg-background border border-primary/10 rounded-3xl space-y-3">
              <Compass size={24} className="text-primary-light" />
              <h4 className="font-bold text-sm text-primary">Local Support Centers</h4>
              <p className="text-xs text-primary/70 leading-relaxed">
                Contact your nearest Krishi Vigyan Kendra (KVK) for specialized soil tests and agronomy consulting.
              </p>
              <a href="#kvk" className="text-xs font-bold text-primary-light hover:underline flex items-center gap-1">
                <span>Find Near Me</span>
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Videos Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid, idx) => (
            <div 
              key={idx}
              className="flex flex-col bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 bg-background-soft overflow-hidden">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="p-3.5 bg-white text-primary rounded-full shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-bold text-white bg-black/60 rounded-md">
                  {vid.duration}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <h3 className="font-bold text-sm text-primary group-hover:text-primary-light transition-theme line-clamp-2">
                  {vid.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs text-primary/50 font-bold">
                  <span>{vid.channel}</span>
                  <span>{vid.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
