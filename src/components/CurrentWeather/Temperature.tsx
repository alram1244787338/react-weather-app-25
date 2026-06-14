import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import { formatTemperature } from '../../utils/unitConversion';

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  const { tempUnit } = usePreferences();

  return <>{formatTemperature(props.value, tempUnit)}</>;
};

export default Temperature;
