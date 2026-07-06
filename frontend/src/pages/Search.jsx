import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, MicOff, AlertCircle, Sparkles, Sprout, ShoppingBag, Loader } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { searchService } from '../services/api';
import CropCard from '../components/CropCard';
import ProductCard from '../components/ProductCard';

export default function Search({ initialQuery }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery || '');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState('');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearchSubmit(initialQuery);
    }
  }, [initialQuery]);

  // Handle Autocomplete Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await searchService.globalSearch(query);
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error(err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearchSubmit = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    try {
      setLoading(true);
      setSuggestions([]);
      const res = await searchService.globalSearch(q);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert('Search failed. Check connection to backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleMicSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError(t('search_mic_error'));
      setTimeout(() => setMicError(''), 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Indian English, support Hindi/Telugu if set
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setMicError('');
    };

    recognition.onresult = (e) => {
      const speechToText = e.results[0][0].transcript;
      setQuery(speechToText);
      handleSearchSubmit(speechToText);
    };

    recognition.onerror = (e) => {
      console.error(e);
      setMicError('Voice recording failed. Try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-primary flex items-center justify-center gap-2">
          <span>{t('search_title')}</span>
        </h1>
        <p className="text-sm text-primary-light font-semibold max-w-md mx-auto">
          Lookup crop schedules, diseases, seed names, tools, or marketplace listings in one search query.
        </p>
      </div>

      {/* Main Search Bar Form */}
      <div className="max-w-2xl mx-auto relative">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}
          className="flex items-center gap-2 p-1.5 bg-background border-2 border-primary/20 focus-within:border-primary rounded-2xl shadow-md transition-theme"
        >
          <SearchIcon size={20} className="text-primary/45 ml-3 shrink-0" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 px-2 py-2.5 text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-primary placeholder-primary/40"
          />
          
          {/* Microphone trigger */}
          <button 
            type="button"
            onClick={handleMicSearch}
            className={`p-2.5 rounded-xl transition-theme hover:scale-105 shrink-0 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-primary-light/10 text-primary-light hover:bg-primary-light/20'
            }`}
            title="Search using Voice Mic"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <button 
            type="submit"
            className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold text-xs rounded-xl shadow-sm transition-theme shrink-0"
          >
            Search
          </button>
        </form>

        {/* Listening banner */}
        {isListening && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-bold text-xs z-10 animate-bounce">
            {t('search_mic_listen')}
          </div>
        )}

        {/* Mic Error indicator */}
        {micError && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-center font-bold text-xs z-10 flex items-center justify-center gap-2">
            <AlertCircle size={14} />
            <span>{micError}</span>
          </div>
        )}

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-primary/10 rounded-2xl shadow-xl z-20 overflow-hidden divide-y divide-primary/5 transition-theme">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(suggestion);
                  handleSearchSubmit(suggestion);
                }}
                className="w-full px-5 py-3 text-left text-xs font-semibold text-primary hover:bg-primary/5 flex items-center gap-2"
              >
                <SearchIcon size={12} className="opacity-40" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Results Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader className="animate-spin text-primary" size={28} />
          <p className="text-xs font-bold text-primary/70">Analyzing agricultural database...</p>
        </div>
      ) : results ? (
        <div className="space-y-12">
          {/* Crops Results */}
          {results.crops && results.crops.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Sprout className="text-primary-light" size={20} />
                <span>{t('search_results_crops')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.crops.map((crop) => (
                  <CropCard 
                    key={crop.id} 
                    crop={{
                      crop_name: crop.name,
                      season: crop.season,
                      fertilizer: crop.fertilizer,
                      disease: crop.disease,
                      description: "Found via Global Search index match."
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Marketplace Results */}
          {results.marketplace && results.marketplace.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="text-primary-light" size={20} />
                <span>{t('search_results_market')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.marketplace.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={{
                      product_name: prod.name,
                      category: prod.category,
                      price: prod.price,
                      seller: "Listed Trader",
                      description: "Market item match."
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {(!results.crops || results.crops.length === 0) && (!results.marketplace || results.marketplace.length === 0) && (
            <div className="text-center py-20 border border-dashed border-primary/10 rounded-3xl text-primary/45 font-bold">
              No crops or marketplace items match your search. Try searching "Ragi", "Rice" or "Fertilizer".
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-primary/40 font-bold border border-dashed border-primary/10 rounded-3xl flex flex-col items-center gap-3">
          <Sparkles size={24} />
          <span>Enter a search term or click the microphone to ask AgriVerse.</span>
        </div>
      )}
    </div>
  );
}
