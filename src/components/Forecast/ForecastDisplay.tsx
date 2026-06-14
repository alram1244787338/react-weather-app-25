import React from 'react';
import { TempUnit } from '../../utils/unitConversion';
import { ExtendedForecastData } from '../../api/types';
import ForecastCard from './ForecastCard';

interface ForecastDisplayProps {
  forecast: ExtendedForecastData[];
  tempUnit: TempUnit;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast, tempUnit }) => {
  return (
    <div className="rw-forecast">
      <h6 className="rw-section-title">Extended Forecast</h6>
      <div className="rw-forecast-items">
        {forecast.map((item) => (
          <ForecastCard
            key={item.day}
            day={item.day}
            weatherCode={item.weather.id}
            main={item.weather.main}
            high={item.temp.temp_max}
            low={item.temp.temp_min}
            tempUnit={tempUnit}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
