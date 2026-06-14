import { ExtendedForecastData, WeatherData, WeatherQuery } from './types';
import { fetchExtendedForecastData, fetchWeatherData } from './weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius, msToKmh } from '../utils/unitConversion';

export type WeatherResult = {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
};

/**
 * Raw shape returned by the two OpenWeatherMap endpoints. It only lives here
 * because this is the single place that knows about the wire format.
 */
type WeatherApiResponse = [
  Omit<WeatherData, 'weather'> & {
    cod: number;
    message?: string;
    weather: WeatherData['weather'][];
  },
  {
    list: Array<{
      temp: {
        max: number;
        min: number;
      };
      weather: Array<{
        id: number;
        main: string;
      }>;
    }>;
  },
];

const transformWeatherData = (res: WeatherApiResponse): WeatherResult => {
  const weather: WeatherData = {
    ...res[0],
    weather: res[0].weather[0],
    main: {
      ...res[0].main,
      temp: kelvinToCelcius(res[0].main.temp),
      feels_like: kelvinToCelcius(res[0].main.feels_like),
      temp_max: kelvinToCelcius(res[0].main.temp_max),
      temp_min: kelvinToCelcius(res[0].main.temp_min),
    },
    wind: {
      ...res[0].wind,
      speed: msToKmh(res[0].wind.speed),
    },
  };

  const next7Days = getNextSevenDays();
  const forecast = res[1].list.map((item, index) => ({
    day: next7Days[index],
    temp: {
      temp_max: kelvinToCelcius(item.temp.max),
      temp_min: kelvinToCelcius(item.temp.min),
    },
    weather: {
      id: item.weather[0].id,
      main: item.weather[0].main,
    },
  }));

  return { weather, forecast };
};

/**
 * Fetches both endpoints, validates the response and returns ready-to-render,
 * unit-normalised data. Throws when the place could not be resolved so callers
 * only have to deal with a success value or an error.
 */
export const getWeather = async (query: WeatherQuery): Promise<WeatherResult> => {
  const res = (await Promise.all([
    fetchWeatherData(query),
    fetchExtendedForecastData(query),
  ])) as WeatherApiResponse;

  if (res[0].cod !== 200) {
    throw new Error(res[0].message ?? 'Cannot load weather for this place');
  }

  return transformWeatherData(res);
};
