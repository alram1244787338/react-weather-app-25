import { celciusToFahrenheit, kmToMile, TempUnit } from './unitConversion';

/**
 * Convert a Celsius temperature for display.
 * Returns the number in Celsius or Fahrenheit depending on the selected unit.
 */
export function formatTemperature(celsius: number, unit: TempUnit): number {
  if (unit === TempUnit.FAHRENHEIT) {
    return celciusToFahrenheit(celsius);
  }
  return celsius;
}

/**
 * Convert a km/h wind speed for display.
 * Returns km/h when Celsius is selected, mph when Fahrenheit is selected.
 */
export function formatWindSpeed(kmh: number, unit: TempUnit): number {
  if (unit === TempUnit.FAHRENHEIT) {
    return kmToMile(kmh);
  }
  return kmh;
}

/**
 * Get the wind speed unit label for the current temperature unit.
 */
export function getWindUnitLabel(unit: TempUnit): string {
  return unit === TempUnit.CELCIUS ? 'kph' : 'mph';
}
