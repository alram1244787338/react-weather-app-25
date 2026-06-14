import React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import SuggestionItem from './SuggestionItem';

interface ISuggestionListProps {
  suggestions: PlaceSuggestion[];
  onSelect: (suggestion: PlaceSuggestion) => void;
  ref?: React.Ref<HTMLDivElement>;
}

const SuggestionList: React.FC<ISuggestionListProps> = ({ suggestions, onSelect, ref }) => (
  <div className="rw-search-result" ref={ref}>
    {suggestions.map((suggestion) => (
      <SuggestionItem key={suggestion.id} label={suggestion.label} onSelect={() => onSelect(suggestion)} />
    ))}
  </div>
);

export default SuggestionList;
