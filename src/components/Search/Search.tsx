import React, { useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { useSearch } from '../../hooks/useSearch';
import { useClickOutside } from './../../hooks/useClickOutside';
import LocationIcon from '../../assets/location-icon.svg?react';
import SearchIcon from '../../assets/search-icon.svg?react';
import Suggestion from './Suggestion';

const Search: React.FC = () => {
  const { fetchWeather } = useWeather();
  const suggestionRef = useRef<HTMLDivElement>(null);
  const {
    inputValue,
    setInputValue,
    suggestions,
    showSuggestions,
    hideSuggestions,
    selectPlace,
    requestGeolocation,
  } = useSearch(fetchWeather);

  useClickOutside(suggestionRef, hideSuggestions);

  return (
    <div className="rw-search">
      <SearchIcon className="rw-search-icon" />
      <input
        className="rw-search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for location"
      />
      <button className="rw-location-button" type="button" onClick={requestGeolocation}>
        <LocationIcon className="rw-location-icon" />
      </button>
      {showSuggestions && (
        <div className="rw-search-result" ref={suggestionRef}>
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              onSelect={() => selectPlace(suggestion)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
