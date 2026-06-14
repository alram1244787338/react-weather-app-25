import * as React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';

interface ISuggestionProps {
  suggestion: PlaceSuggestion;
  onSelect: () => void;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  return (
    <button className="rw-suggestion-item" type="button" onClick={props.onSelect}>
      {props.suggestion.label}
    </button>
  );
};

export default Suggestion;
