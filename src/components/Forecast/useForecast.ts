import { useAppContext } from '../../context/AppContext';

/**
 * Data-preparation layer for the extended forecast: reads app state and maps it
 * into a render-ready list of days. The presentation component only renders.
 */
export const useForecast = () => {
  const { extendedWeatherData, isInitial, tempUnit } = useAppContext();

  if (isInitial) {
    return { isInitial: true as const };
  }

  return {
    isInitial: false as const,
    tempUnit,
    days: extendedWeatherData.map((item, index) => ({
      key: `${item.day}-${index}`,
      day: item.day,
      iconCode: item.weather.id,
      condition: item.weather.main,
      high: item.temp.temp_max,
      low: item.temp.temp_min,
    })),
  };
};
