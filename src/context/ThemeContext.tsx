import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ThemeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const STORAGE_KEY = 'darkMode';

const getInitialDarkMode = (): boolean => {
  return window.localStorage.getItem(STORAGE_KEY) === 'true';
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next.toString());
      return next;
    });
  }, []);

  const value = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode, toggleDarkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};
