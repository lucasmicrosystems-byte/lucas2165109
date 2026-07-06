import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ThemeProvider } from './hooks/ThemeContext';
import { LanguageProvider } from './hooks/LanguageContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AiAssistantWidget from './components/AiAssistantWidget';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Weather from './pages/Weather';
import Scanner from './pages/Scanner';
import LearningCenter from './pages/LearningCenter';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Login from './pages/Login';

function MainAppLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [globalSearchVal, setGlobalSearchVal] = useState('');
  const [globalMicListening, setGlobalMicListening] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('agriverse-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('agriverse-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('agriverse-user');
  };

  const handleGlobalMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setGlobalMicListening(true);
    recognition.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      setGlobalSearchVal(txt);
      navigate('/search');
    };
    recognition.onend = () => setGlobalMicListening(false);
    recognition.start();
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar 
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onToggleGlobalMic={handleGlobalMic}
        globalMicListening={globalMicListening}
      />
      
      <div className="flex-1 flex relative">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 flex flex-col min-w-0 bg-background transition-theme p-2 sm:p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
            <Route path="/search" element={<Search initialQuery={globalSearchVal} />} />
            <Route path="/weather" element={<Weather currentUser={currentUser} />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/marketplace" element={<Marketplace currentUser={currentUser} />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={
                currentUser 
                  ? <Navigate to="/dashboard" replace /> 
                  : <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Footer />
        </main>
      </div>

      {/* Floating AI assistant chatbot */}
      <AiAssistantWidget />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <MainAppLayout />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
