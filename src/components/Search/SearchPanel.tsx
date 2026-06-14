import React from 'react';
import LocationIcon from '../../assets/location-icon.svg?react';
import SearchIcon from '../../assets/search-icon.svg?react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import { WeatherQuery } from '../../context/WeatherContext';
import { UseSearchSuggestionsReturn } from '../../hooks/useSearchSuggestions';
import SuggestionList from './SuggestionList';

interface SearchPanelProps {
  search: UseSearchSuggestionsReturn;
  onQuery: (query: WeatherQuery) => Promise<void>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ search, onQuery }) => {
  const {
    inputValue,
    suggestions,
    showSuggestions,
    suggestionListRef,
    onInputChange,
    hideSuggestions,
  } = search;

  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    onQuery({ lat: suggestion.lat, lng: suggestion.lng });
    // Delay hiding to allow loading indicator to appear first
    setTimeout(() => {
      hideSuggestions();
    }, 400);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onQuery({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="rw-search">
      <SearchIcon className="rw-search-icon" />
      <input
        className="rw-search-input"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Search for location"
      />
      <button className="rw-location-button" type="button" onClick={handleGeolocation}>
        <LocationIcon className="rw-location-icon" />
      </button>
      {showSuggestions && (
        <SuggestionList
          suggestions={suggestions}
          onSelect={handleSelectSuggestion}
          listRef={suggestionListRef}
        />
      )}
    </div>
  );
};

export default SearchPanel;
