import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { TempUnit } from '../utils/unitConversion';

type PreferencesContextValue = {
  tempUnit: TempUnit;
  darkMode: boolean;
  toggleTempUnit: () => void;
  toggleDarkMode: () => void;
};

const getInitialDarkMode = () => {
  return window.localStorage.getItem('darkMode') === 'true';
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tempUnit, setTempUnit] = useState<TempUnit>(TempUnit.CELCIUS);
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  const toggleTempUnit = useCallback(() => {
    setTempUnit((unit) => (unit === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem('darkMode', next.toString());
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ tempUnit, darkMode, toggleTempUnit, toggleDarkMode }),
    [tempUnit, darkMode, toggleTempUnit, toggleDarkMode]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider');
  }

  return context;
};
