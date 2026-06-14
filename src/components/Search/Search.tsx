import React, { useEffect, useRef, useState } from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import LocationIcon from '../../assets/location-icon.svg?react';
import SearchIcon from '../../assets/search-icon.svg?react';
import { useAppContext } from '../../context/AppContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import SuggestionList from './SuggestionList';
import { useCitySuggestions } from './useCitySuggestions';

const Search: React.FC = () => {
  const { fetchWeather } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { query, suggestions } = useCitySuggestions(inputValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(Boolean(query));
  }, [query]);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (suggestion: PlaceSuggestion) => {
    fetchWeather({ lat: suggestion.lat, lng: suggestion.lng });
    window.setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather({
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
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for location"
      />
      <button className="rw-location-button" type="button" onClick={handleLocate}>
        <LocationIcon className="rw-location-icon" />
      </button>
      {isOpen && <SuggestionList ref={dropdownRef} suggestions={suggestions} onSelect={handleSelect} />}
    </div>
  );
};

export default Search;
