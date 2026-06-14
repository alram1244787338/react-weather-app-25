import React, { useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import Home from './pages/Home';

const App: React.FC = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return <Home />;
};

export default App;
