// src/context/_LanguageContext.js

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('he'); // default to Hebrew
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
