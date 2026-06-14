export enum TempUnit {
  CELCIUS,
  FAHRENHEIT,
}

export function kelvinToCelcius(num: number) {
  return Math.round(num - 273.15);
}

export function celciusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32);
}

export function fahrenheitToCelcius(f: number) {
  return Math.round(((f - 32) * 5) / 9);
}

export function kmToMile(n: number) {
  return Math.round(n / 1.60934);
}

export function mileToKm(n: number) {
  return Math.round(n * 1.60934);
}

export function msToKmh(n: number) {
  return Math.round(n * 3.6);
}

/**
 * Display helpers keep all unit/format decisions in one place. Stored values are
 * always metric (celsius, km/h); these convert to whatever the selected unit needs.
 */
export function formatTemperature(celsius: number, unit: TempUnit) {
  return unit === TempUnit.FAHRENHEIT ? celciusToFahrenheit(celsius) : celsius;
}

export type WindDisplay = {
  value: number;
  unit: string;
};

export function formatWind(kph: number, unit: TempUnit): WindDisplay {
  return unit === TempUnit.FAHRENHEIT
    ? { value: kmToMile(kph), unit: 'mph' }
    : { value: kph, unit: 'kph' };
}
