import { celciusToFahrenheit, kmToMile, TempUnit } from './unitConversion';

export const formatTemperature = (celsius: number, unit: TempUnit): number =>
  unit === TempUnit.FAHRENHEIT ? celciusToFahrenheit(celsius) : celsius;

export const formatWind = (speedKph: number, unit: TempUnit): { value: number; label: string } =>
  unit === TempUnit.FAHRENHEIT
    ? { value: kmToMile(speedKph), label: 'mph' }
    : { value: speedKph, label: 'kph' };
