import React from 'react';
import { TempUnit } from '../../utils/unitConversion';
import { formatTemperature } from '../../utils/weatherFormatters';

interface TemperatureDisplayProps {
  /** Temperature value in Celsius */
  value: number;
  /** Unit to display as */
  unit: TempUnit;
}

/**
 * Renders a temperature number with a degree symbol.
 * Handles Celsius→Fahrenheit conversion internally via formatTemperature.
 */
const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ value, unit }) => {
  return (
    <>
      {formatTemperature(value, unit)}
      <sup>&deg;</sup>
    </>
  );
};

export default TemperatureDisplay;
