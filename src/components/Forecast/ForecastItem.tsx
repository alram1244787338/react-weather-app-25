import React from 'react';
import { TempUnit } from '../../utils/unitConversion';
import Temperature from '../ui/Temperature/Temperature';
import WeatherIcon from '../ui/WeatherIcon/WeatherIcon';

interface IForecastItemProps {
  day: string;
  iconCode: number;
  condition: string;
  high: number;
  low: number;
  unit: TempUnit;
}

const ForecastItem: React.FC<IForecastItemProps> = ({ day, iconCode, condition, high, low, unit }) => (
  <div className="rw-forecast-item">
    <h6>{day}</h6>
    <WeatherIcon code={iconCode} />
    <p>{condition}</p>
    <span>
      <Temperature value={high} unit={unit} />
      <small>/</small>
      <Temperature value={low} unit={unit} />
    </span>
  </div>
);

export default ForecastItem;
