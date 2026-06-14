import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import { celciusToFahrenheit, TempUnit } from '../../utils/unitConversion';

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  const { tempUnit: degreeType } = usePreferences();

  if (degreeType === TempUnit.FAHRENHEIT) {
    return <>{celciusToFahrenheit(props.value)}</>;
  }
  return <>{props.value}</>;
};

export default Temperature;
