import { ExtendedForecastData, WeatherData, WeatherQuery } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';

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

export type WeatherResult = {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
};

const transformWeatherData = (res: WeatherApiResponse): WeatherResult => {
  const weather = {
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
      speed: Math.round(res[0].wind.speed * 3.6),
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

export async function getWeather(query: WeatherQuery): Promise<WeatherResult> {
  const res = (await Promise.all([
    fetchWeatherData(query),
    fetchExtendedForecastData(query),
  ])) as WeatherApiResponse;

  if (res[0].cod !== 200) {
    throw new Error(res[0].message ?? 'Failed to fetch weather data');
  }

  return transformWeatherData(res);
}
