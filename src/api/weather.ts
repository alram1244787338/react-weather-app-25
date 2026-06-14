import { ExtendedForecastData, WeatherData } from './types';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export type WeatherQuery = string | { lat: number; lng: number };

export type WeatherResult = {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
};

/**
 * Raw shapes returned by the OpenWeather endpoints. These stay private to the
 * API layer; everything outside only ever sees the domain types above.
 */
type RawCurrentWeather = Omit<WeatherData, 'weather'> & {
  cod: number;
  message?: string;
  weather: WeatherData['weather'][];
};

type RawForecast = {
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
};

const toQueryParam = (query: WeatherQuery): string => {
  if (typeof query === 'object') {
    return `lat=${query.lat}&lon=${query.lng}`;
  }
  return `q=${query}`;
};

const fetchCurrentWeather = async (query: WeatherQuery): Promise<RawCurrentWeather> => {
  const res = await fetch(`${baseUrl}/weather?${toQueryParam(query)}&appid=${apiKey}`);
  return res.json();
};

const fetchForecast = async (query: WeatherQuery): Promise<RawForecast> => {
  const res = await fetch(`${baseUrl}/forecast/daily?${toQueryParam(query)}&appid=${apiKey}`);
  return res.json();
};

const mapCurrentWeather = (raw: RawCurrentWeather): WeatherData => ({
  name: raw.name,
  sys: raw.sys,
  weather: raw.weather[0],
  main: {
    ...raw.main,
    temp: kelvinToCelcius(raw.main.temp),
    feels_like: kelvinToCelcius(raw.main.feels_like),
    temp_max: kelvinToCelcius(raw.main.temp_max),
    temp_min: kelvinToCelcius(raw.main.temp_min),
  },
  wind: {
    ...raw.wind,
    speed: Math.round(raw.wind.speed * 3.6),
  },
});

const mapForecast = (raw: RawForecast): ExtendedForecastData[] => {
  const days = getNextSevenDays();
  return raw.list.map((item, index) => ({
    day: days[index],
    temp: {
      temp_max: kelvinToCelcius(item.temp.max),
      temp_min: kelvinToCelcius(item.temp.min),
    },
    weather: {
      id: item.weather[0].id,
      main: item.weather[0].main,
    },
  }));
};

/**
 * Fetches the current weather and extended forecast for a query and returns
 * them already shaped into domain types. Throws when the location cannot be
 * resolved so callers only deal with success/error, not raw status codes.
 */
export const getWeather = async (query: WeatherQuery): Promise<WeatherResult> => {
  const [current, forecast] = await Promise.all([fetchCurrentWeather(query), fetchForecast(query)]);

  if (current.cod !== 200) {
    throw new Error(current.message ?? 'Unable to load weather for this location');
  }

  return {
    weather: mapCurrentWeather(current),
    forecast: mapForecast(forecast),
  };
};
