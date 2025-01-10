import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState('Inicio');

  return (
    <HeaderContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </HeaderContext.Provider>
  );
};