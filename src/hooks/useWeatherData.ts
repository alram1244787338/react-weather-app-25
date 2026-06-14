import { useWeatherContext, WeatherQuery } from '../context/WeatherContext';

export type UseWeatherDataReturn = {
  weatherData: ReturnType<typeof useWeatherContext>['weatherData'];
  forecastData: ReturnType<typeof useWeatherContext>['extendedWeatherData'];
  tempUnit: ReturnType<typeof useWeatherContext>['tempUnit'];
  isLoading: boolean;
  isInitial: boolean;
  isError: boolean;
  fetchWeather: (query: WeatherQuery) => Promise<void>;
  changeTempUnit: () => void;
};

/**
 * Thin wrapper over WeatherContext that exposes a flat, descriptive API
 * for page-level components.
 */
export const useWeatherData = (): UseWeatherDataReturn => {
  const {
    weatherData,
    extendedWeatherData,
    tempUnit,
    isLoading,
    isInitial,
    isError,
    fetchWeather,
    changeTempUnit,
  } = useWeatherContext();

  return {
    weatherData,
    forecastData: extendedWeatherData,
    tempUnit,
    isLoading,
    isInitial,
    isError,
    fetchWeather,
    changeTempUnit,
  };
};
