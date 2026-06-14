import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

type ThemeState = {
  darkMode: boolean;
};

type ThemeContextValue = ThemeState & {
  toggleDarkMode: () => void;
};

type Action = { type: 'toggle-dark-mode'; payload: boolean };

const getInitialDarkMode = () => {
  return window.localStorage.getItem('darkMode') === 'true';
};

const initialState: ThemeState = {
  darkMode: getInitialDarkMode(),
};

const themeReducer = (state: ThemeState, action: Action): ThemeState => {
  switch (action.type) {
    case 'toggle-dark-mode':
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleDarkMode = useCallback(() => {
    const darkMode = !state.darkMode;
    window.localStorage.setItem('darkMode', darkMode.toString());
    dispatch({ type: 'toggle-dark-mode', payload: darkMode });
  }, [state.darkMode]);

  const value = useMemo(() => ({ ...state, toggleDarkMode }), [state, toggleDarkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};
