import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PreferencesProvider } from './context/PreferencesContext';
import { WeatherProvider } from './context/WeatherContext';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <PreferencesProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </PreferencesProvider>
  </StrictMode>
);
