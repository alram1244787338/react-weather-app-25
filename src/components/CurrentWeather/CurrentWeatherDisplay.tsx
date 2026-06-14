import React from 'react';
import HighIcon from '../../assets/high-icon.svg?react';
import HumidityIcon from '../../assets/humidity-icon.svg?react';
import LowIcon from '../../assets/low-icon.svg?react';
import PressureIcon from '../../assets/pressure-icon.svg?react';
import WindIcon from '../../assets/wind-icon.svg?react';
import { TempUnit } from '../../utils/unitConversion';
import { WeatherData } from '../../api/types';
import { formatWindSpeed, getWindUnitLabel } from '../../utils/weatherFormatters';
import TemperatureDisplay from '../common/TemperatureDisplay';
import WeatherIcon from '../common/WeatherIcon';
import ToggleSwitch from '../ui/ToggleSwitch/ToggleSwitch';

interface CurrentWeatherDisplayProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  onChangeTempUnit: () => void;
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  weather,
  tempUnit,
  onChangeTempUnit,
}) => {
  return (
    <div className="rw-weather">
      <div className="rw-weather-header">
        <h6 className="rw-section-title">Current Weather</h6>
        <div>
          <ToggleSwitch
            isToggled={tempUnit === TempUnit.FAHRENHEIT}
            onToggle={onChangeTempUnit}
          />
        </div>
      </div>
      <div className="rw-current-weather-inner">
        <div className="rw-current-status">
          <h4>{weather.name}</h4>
          <div className="rw-current-temp">
            <WeatherIcon code={weather.weather.id} big />
            <span>
              <TemperatureDisplay value={weather.main.temp} unit={tempUnit} />
            </span>
          </div>
          <h6>{weather.weather.description}</h6>
        </div>

        <div className="rw-current-info">
          <p className="rw-feels-like">
            Feels like <TemperatureDisplay value={weather.main.feels_like} unit={tempUnit} />
          </p>
          <div className="rw-high-low">
            <div className="rw-weather-degree">
              <HighIcon />
              <TemperatureDisplay value={weather.main.temp_max} unit={tempUnit} />
            </div>
            <div className="rw-weather-degree">
              <LowIcon />
              <TemperatureDisplay value={weather.main.temp_min} unit={tempUnit} />
            </div>
          </div>
          <div className="rw-info-row">
            <div>
              <HumidityIcon /> Humidity
            </div>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="rw-info-row">
            <div>
              <WindIcon /> Wind
            </div>
            <span>
              {formatWindSpeed(weather.wind.speed, tempUnit)}
              {getWindUnitLabel(tempUnit)}
            </span>
          </div>
          <div className="rw-info-row">
            <div>
              <PressureIcon /> Pressure
            </div>
            <span>{weather.main.pressure}hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
