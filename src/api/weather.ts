import type { WeatherQuery } from './types';

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = async (query: WeatherQuery) => {
  let url = `${baseUrl}/weather?q=${query}&appid=${apiKey}`;

  if (typeof query === 'object') {
    url = `${baseUrl}/weather?lat=${query.lat}&lon=${query.lng}&appid=${apiKey}`;
  }
  return await (await fetch(url)).json();
};

export const fetchExtendedForecastData = async (query: WeatherQuery) => {
  let url = `${baseUrl}/forecast/daily?q=${query}&appid=${apiKey}`;

  if (typeof query === 'object') {
    url = `${baseUrl}/forecast/daily?lat=${query.lat}&lon=${query.lng}&appid=${apiKey}`;
  }

  return await (await fetch(url)).json();
};
