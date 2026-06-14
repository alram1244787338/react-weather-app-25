import * as React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';

interface ISuggestionProps {
  suggestion: PlaceSuggestion;
  onSelect: (lat: number, lng: number) => void;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const onClick = () => {
    props.onSelect(props.suggestion.lat, props.suggestion.lng);
  };

  return (
    <button className="rw-suggestion-item" type="button" onClick={onClick}>
      {props.suggestion.label}
    </button>
  );
};

export default Suggestion;
