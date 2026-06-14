import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { fetchWeather as fetchWeatherService } from '../api/weatherService';
import { ExtendedForecastData, WeatherData, WeatherQuery } from '../api/types';

type WeatherStatus = 'idle' | 'loading' | 'success' | 'error';

type WeatherState = {
  status: WeatherStatus;
  weatherData: WeatherData | null;
  extendedWeatherData: ExtendedForecastData[];
};

type WeatherContextValue = WeatherState & {
  fetchWeather: (query: WeatherQuery) => Promise<void>;
};

type Action =
  | { type: 'fetch-start' }
  | { type: 'fetch-success'; payload: { weather: WeatherData; forecast: ExtendedForecastData[] } }
  | { type: 'fetch-error' };

const initialState: WeatherState = {
  status: 'idle',
  weatherData: null,
  extendedWeatherData: [],
};

const weatherReducer = (state: WeatherState, action: Action): WeatherState => {
  switch (action.type) {
    case 'fetch-start':
      return { ...state, status: 'loading' };
    case 'fetch-success':
      return {
        status: 'success',
        weatherData: action.payload.weather,
        extendedWeatherData: action.payload.forecast,
      };
    case 'fetch-error':
      return { ...state, status: 'error' };
    default:
      return state;
  }
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export const WeatherProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeather = useCallback(async (query: WeatherQuery) => {
    dispatch({ type: 'fetch-start' });
    try {
      const result = await fetchWeatherService(query);
      dispatch({ type: 'fetch-success', payload: result });
    } catch {
      dispatch({ type: 'fetch-error' });
    }
  }, []);

  const value: WeatherContextValue = {
    ...state,
    fetchWeather,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used inside WeatherProvider');
  }
  return context;
};
