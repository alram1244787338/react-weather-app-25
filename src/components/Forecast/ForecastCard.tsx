import React from 'react';
import { TempUnit } from '../../utils/unitConversion';
import TemperatureDisplay from '../common/TemperatureDisplay';
import WeatherIcon from '../common/WeatherIcon';

interface ForecastCardProps {
  day: string;
  weatherCode: number;
  main: string;
  high: number;
  low: number;
  tempUnit: TempUnit;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day, weatherCode, main, high, low, tempUnit }) => {
  return (
    <div className="rw-forecast-item">
      <h6>{day}</h6>
      <WeatherIcon code={weatherCode} />
      <p>{main}</p>
      <span>
        <TemperatureDisplay value={high} unit={tempUnit} />
        <small>/</small>
        <TemperatureDisplay value={low} unit={tempUnit} />
      </span>
    </div>
  );
};

export default ForecastCard;
