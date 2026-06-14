import React from 'react';
import { PreferencesProvider } from './PreferencesContext';
import { WeatherProvider } from './WeatherContext';

/**
 * Thin composition of the independent providers so the app has a single mount
 * point without re-introducing a god context.
 */
export const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <PreferencesProvider>
      <WeatherProvider>{children}</WeatherProvider>
    </PreferencesProvider>
  );
};
