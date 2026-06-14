import React from 'react';
import HighIcon from '../../assets/high-icon.svg?react';
import HumidityIcon from '../../assets/humidity-icon.svg?react';
import LowIcon from '../../assets/low-icon.svg?react';
import PressureIcon from '../../assets/pressure-icon.svg?react';
import WindIcon from '../../assets/wind-icon.svg?react';
import Temperature from '../ui/Temperature/Temperature';
import ToggleSwitch from '../ui/ToggleSwitch/ToggleSwitch';
import WeatherIcon from '../ui/WeatherIcon/WeatherIcon';
import { useCurrentWeather } from './useCurrentWeather';

const CurrentWeather: React.FC = () => {
  const vm = useCurrentWeather();

  if (vm.isInitial) return null;

  return (
    <div className="rw-weather">
      <div className="rw-weather-header">
        <h6 className="rw-section-title">Current Weather</h6>
        <div>
          <ToggleSwitch onClick={vm.changeTempUnit} />
        </div>
      </div>
      <div className="rw-current-weather-inner">
        <div className="rw-current-status">
          <h4>{vm.city}</h4>
          <div className="rw-current-temp">
            <WeatherIcon code={vm.iconCode} big />
            <span>
              <Temperature value={vm.temp} unit={vm.tempUnit} />
            </span>
          </div>
          <h6>{vm.description}</h6>
        </div>

        <div className="rw-current-info">
          <p className="rw-feels-like">
            Feels like <Temperature value={vm.feelsLike} unit={vm.tempUnit} />
          </p>
          <div className="rw-high-low">
            <div className="rw-weather-degree">
              <HighIcon />
              <Temperature value={vm.high} unit={vm.tempUnit} />
            </div>
            <div className="rw-weather-degree">
              <LowIcon />
              <Temperature value={vm.low} unit={vm.tempUnit} />
            </div>
          </div>
          <div className="rw-info-row">
            <div>
              <HumidityIcon /> Humidity
            </div>
            <span>{vm.humidity}%</span>
          </div>
          <div className="rw-info-row">
            <div>
              <WindIcon /> Wind
            </div>
            <span>
              {vm.wind.value}
              {vm.wind.label}
            </span>
          </div>
          <div className="rw-info-row">
            <div>
              <PressureIcon /> Pressure
            </div>
            <span>{vm.pressure}hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
