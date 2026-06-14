import React from 'react';
import { formatTemperature } from '../../../utils/format';
import { TempUnit } from '../../../utils/unitConversion';

interface ITemperatureProps {
  value: number;
  unit: TempUnit;
}

const Temperature: React.FC<ITemperatureProps> = ({ value, unit }) => (
  <>
    {formatTemperature(value, unit)}
    <sup>&deg;</sup>
  </>
);

export default Temperature;
