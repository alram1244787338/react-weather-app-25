import React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import SuggestionItem from './SuggestionItem';

interface SuggestionListProps {
  suggestions: PlaceSuggestion[];
  onSelect: (suggestion: PlaceSuggestion) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect, listRef }) => {
  return (
    <div className="rw-search-result" ref={listRef}>
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={suggestion.id}
          label={suggestion.label}
          onClick={() => onSelect(suggestion)}
        />
      ))}
    </div>
  );
};

export default SuggestionList;
