import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatWind } from '../../utils/format';

/**
 * Data-preparation layer for the current-weather section: reads app state,
 * applies unit/formatting rules, and exposes a render-ready view model plus the
 * unit toggle handler. The presentation component stays free of business logic.
 */
export const useCurrentWeather = () => {
  const { changeTempUnit, isError, isInitial, tempUnit, weatherData } = useAppContext();

  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
  }, [isError]);

  if (isInitial) {
    return { isInitial: true as const };
  }

  return {
    isInitial: false as const,
    tempUnit,
    changeTempUnit,
    city: weatherData.name,
    description: weatherData.weather.description,
    iconCode: weatherData.weather.id,
    temp: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    high: weatherData.main.temp_max,
    low: weatherData.main.temp_min,
    humidity: weatherData.main.humidity,
    pressure: weatherData.main.pressure,
    wind: formatWind(weatherData.wind.speed, tempUnit),
  };
};
