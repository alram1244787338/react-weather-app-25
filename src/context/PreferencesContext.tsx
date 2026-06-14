import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { TempUnit } from '../utils/unitConversion';

type Preferences = {
  tempUnit: TempUnit;
  darkMode: boolean;
};

type PreferencesContextValue = Preferences & {
  changeTempUnit: () => void;
  toggleDarkMode: () => void;
};

const getInitialDarkMode = () => {
  return window.localStorage.getItem('darkMode') === 'true';
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tempUnit, setTempUnit] = useState(TempUnit.CELSIUS);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const changeTempUnit = useCallback(() => {
    setTempUnit((prev) => (prev === TempUnit.CELSIUS ? TempUnit.FAHRENHEIT : TempUnit.CELSIUS));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem('darkMode', next.toString());
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ tempUnit, darkMode, changeTempUnit, toggleDarkMode }),
    [tempUnit, darkMode, changeTempUnit, toggleDarkMode]
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
