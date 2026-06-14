import React, { useEffect } from 'react';
import { usePreferences } from './context/PreferencesContext';
import Home from './pages/Home';

const App: React.FC = () => {
  const { darkMode } = usePreferences();

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return <Home />;
};

export default App;
