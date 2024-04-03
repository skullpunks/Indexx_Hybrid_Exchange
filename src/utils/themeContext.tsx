import React, { useState, createContext } from 'react';

interface IThemeContext {
  theme: string;
  setTheme: any;
}
export const Theme = createContext<IThemeContext | null>(null);
export const ThemeContext = ({ children }: any) => {
  const selectedTheme = localStorage.getItem('selectedTheme');
  const [theme, setTheme] = useState<string>(selectedTheme ?? 'light');

  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
};
