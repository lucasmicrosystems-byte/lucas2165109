import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('agriverse-theme') || 'organic';
  });

  useEffect(() => {
    localStorage.setItem('agriverse-theme', theme);
    if (theme === 'tech') {
      document.body.classList.add('theme-tech');
    } else {
      document.body.classList.remove('theme-tech');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'organic' ? 'tech' : 'organic'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
