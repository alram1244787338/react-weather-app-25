import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import LocationIcon from '../../assets/location-icon.svg?react';
import SearchIcon from '../../assets/search-icon.svg?react';
import Suggestion from './Suggestion';

const Search: React.FC = () => {
  const {
    inputValue,
    onInputChange,
    suggestions,
    showSuggestions,
    suggestionRef,
    selectPlace,
    useGeolocation,
  } = useSearch();

  return (
    <div className="rw-search">
      <SearchIcon className="rw-search-icon" />
      <input
        className="rw-search-input"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Search for location"
      />
      <button
        className="rw-location-button"
        type="button"
        onClick={useGeolocation}
      >
        <LocationIcon className="rw-location-icon" />
      </button>
      {showSuggestions && (
        <div className="rw-search-result" ref={suggestionRef}>
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              onSelect={selectPlace}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
