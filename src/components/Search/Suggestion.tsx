import * as React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import { useWeather } from '../../context/WeatherContext';

interface ISuggestionProps {
  suggestion: PlaceSuggestion;
  hideSuggestionFn: () => void;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const { fetchWeather } = useWeather();

  const onClick = () => {
    fetchWeather({ lat: props.suggestion.lat, lng: props.suggestion.lng });
    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);
  };

  return (
    <button className="rw-suggestion-item" type="button" onClick={onClick}>
      {props.suggestion.label}
    </button>
  );
};

export default Suggestion;
