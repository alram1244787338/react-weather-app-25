import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
