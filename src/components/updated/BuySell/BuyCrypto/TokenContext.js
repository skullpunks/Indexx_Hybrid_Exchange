// TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [selectedToken, setSelectedToken] = useState({ title: 'INEX', image: 'INEX' });

  return (
    <TokenContext.Provider value={{ selectedToken, setSelectedToken }}>
      {children}
    </TokenContext.Provider>
  );
};
