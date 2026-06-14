import React from 'react';

interface ISuggestionItemProps {
  label: string;
  onSelect: () => void;
}

const SuggestionItem: React.FC<ISuggestionItemProps> = ({ label, onSelect }) => (
  <button className="rw-suggestion-item" type="button" onClick={onSelect}>
    {label}
  </button>
);

export default SuggestionItem;
