import React from 'react';

interface SuggestionItemProps {
  label: string;
  onClick: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ label, onClick }) => {
  return (
    <button className="rw-suggestion-item" type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default SuggestionItem;
