import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { ExtendedForecastData, WeatherData, WeatherQuery } from '../api/types';
import { getWeather } from '../services/weatherService';
import { TempUnit } from '../utils/unitConversion';

type WeatherState = {
  tempUnit: TempUnit;
  isLoading: boolean;
  isInitial: boolean;
  weatherData: WeatherData;
  extendedWeatherData: ExtendedForecastData[];
  isError: boolean;
};

type WeatherContextValue = WeatherState & {
  changeTempUnit: () => void;
  fetchWeather: (query: WeatherQuery) => Promise<void>;
};

type Action =
  | { type: 'change-temp-unit' }
  | { type: 'fetch-error' }
  | { type: 'fetch-success'; payload: { weather: WeatherData; forecast: ExtendedForecastData[] } }
  | { type: 'set-loading'; payload: boolean };

const initialWeatherData: WeatherData = {
  main: {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  name: '',
  sys: {
    country: '',
    sunrise: 0,
    sunset: 0,
  },
  weather: {
    id: 200,
    main: '',
    description: '',
    icon: '',
  },
  wind: {
    deg: 0,
    speed: 0,
  },
};

const initialState: WeatherState = {
  tempUnit: TempUnit.CELCIUS,
  isLoading: false,
  isInitial: true,
  weatherData: initialWeatherData,
  extendedWeatherData: [],
  isError: false,
};

const weatherReducer = (state: WeatherState, action: Action): WeatherState => {
  switch (action.type) {
    case 'change-temp-unit':
      return {
        ...state,
        tempUnit: state.tempUnit === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS,
      };
    case 'fetch-error':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'fetch-success':
      return {
        ...state,
        extendedWeatherData: action.payload.forecast,
        isError: false,
        isInitial: false,
        isLoading: false,
        weatherData: action.payload.weather,
      };
    case 'set-loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export const WeatherProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const changeTempUnit = useCallback(() => {
    dispatch({ type: 'change-temp-unit' });
  }, []);

  const fetchWeather = useCallback(async (query: WeatherQuery) => {
    dispatch({ type: 'set-loading', payload: true });

    try {
      const result = await getWeather(query);
      dispatch({ type: 'fetch-success', payload: result });
    } catch {
      dispatch({ type: 'fetch-error' });
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      changeTempUnit,
      fetchWeather,
    }),
    [changeTempUnit, fetchWeather, state]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = (): WeatherContextValue => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used inside WeatherProvider');
  }

  return context;
};
