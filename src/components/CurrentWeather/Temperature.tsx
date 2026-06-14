import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { celciusToFahrenheit, TempUnit } from '../../utils/unitConversion';

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  const { tempUnit: degreeType } = useWeather();

  if (degreeType === TempUnit.FAHRENHEIT) {
    return <>{celciusToFahrenheit(props.value)}</>;
  }
  return <>{props.value}</>;
};

export default Temperature;
