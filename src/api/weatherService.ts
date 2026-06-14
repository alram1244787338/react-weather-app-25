import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';
import {
  ExtendedForecastData,
  RawForecastResponse,
  RawWeatherResponse,
  WeatherData,
  WeatherQuery,
} from './types';
import { fetchExtendedForecastData, fetchWeatherData } from './weather';

export type WeatherResult = {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
};

function transformWeatherData(
  rawWeather: RawWeatherResponse,
  rawForecast: RawForecastResponse
): WeatherResult {
  const weather: WeatherData = {
    name: rawWeather.name,
    sys: rawWeather.sys,
    weather: rawWeather.weather[0],
    main: {
      ...rawWeather.main,
      temp: kelvinToCelcius(rawWeather.main.temp),
      feels_like: kelvinToCelcius(rawWeather.main.feels_like),
      temp_max: kelvinToCelcius(rawWeather.main.temp_max),
      temp_min: kelvinToCelcius(rawWeather.main.temp_min),
    },
    wind: {
      ...rawWeather.wind,
      speed: Math.round(rawWeather.wind.speed * 3.6),
    },
  };

  const next7Days = getNextSevenDays();
  const forecast = rawForecast.list.map((item, index) => ({
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
}

export async function fetchWeather(query: WeatherQuery): Promise<WeatherResult> {
  const [rawWeather, rawForecast] = (await Promise.all([
    fetchWeatherData(query),
    fetchExtendedForecastData(query),
  ])) as [RawWeatherResponse, RawForecastResponse];

  if (rawWeather.cod !== 200) {
    throw new Error('Failed to fetch weather data');
  }

  return transformWeatherData(rawWeather, rawForecast);
}
