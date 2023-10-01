import React, { createContext, useContext, useEffect, useState } from 'react';

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 当 localStorage 中的 token 变化时，更新上下文中的 token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [localStorage.getItem('token')]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
