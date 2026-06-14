import React from 'react';
import ForecastItem from './ForecastItem';
import { useForecast } from './useForecast';

const Forecast: React.FC = () => {
  const vm = useForecast();

  if (vm.isInitial) return null;

  return (
    <div className="rw-forecast">
      <h6 className="rw-section-title">Extended Forecast</h6>
      <div className="rw-forecast-items">
        {vm.days.map((day) => (
          <ForecastItem
            key={day.key}
            day={day.day}
            iconCode={day.iconCode}
            condition={day.condition}
            high={day.high}
            low={day.low}
            unit={vm.tempUnit}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
