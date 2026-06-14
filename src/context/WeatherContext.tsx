import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ExtendedForecastData, WeatherData, WeatherQuery } from '../api/types';
import { getWeather } from '../api/weatherService';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error';

type WeatherContextValue = {
  weather: WeatherData | null;
  forecast: ExtendedForecastData[];
  status: WeatherStatus;
  fetchWeather: (query: WeatherQuery) => Promise<void>;
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export const WeatherProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ExtendedForecastData[]>([]);
  const [status, setStatus] = useState<WeatherStatus>('idle');

  const fetchWeather = useCallback(async (query: WeatherQuery) => {
    setStatus('loading');

    try {
      const result = await getWeather(query);
      setWeather(result.weather);
      setForecast(result.forecast);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  const value = useMemo(
    () => ({ weather, forecast, status, fetchWeather }),
    [weather, forecast, status, fetchWeather]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used inside WeatherProvider');
  }

  return context;
};
