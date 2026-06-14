import { useEffect, useState } from 'react';
import { fetchCities, PlaceSuggestion } from '../api/placeSuggestion';
import { WeatherQuery } from '../api/types';

/**
 * Owns the whole search interaction: the input value, debounced lookups, the
 * suggestion list and geolocation. Components only need to render what it
 * returns, so changing an interaction stays inside this hook.
 */
export const useSearch = (onSelectPlace: (query: WeatherQuery) => void) => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(inputValue.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    let isActive = true;
    setShowSuggestions(true);

    fetchCities(searchTerm).then((res) => {
      if (isActive) {
        setSuggestions(res);
      }
    });

    return () => {
      isActive = false;
    };
  }, [searchTerm]);

  const hideSuggestions = () => setShowSuggestions(false);

  const selectPlace = (place: PlaceSuggestion) => {
    onSelectPlace({ lat: place.lat, lng: place.lng });
    window.setTimeout(() => {
      setShowSuggestions(false);
    }, 400);
  };

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        onSelectPlace({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return {
    inputValue,
    setInputValue,
    suggestions,
    showSuggestions,
    hideSuggestions,
    selectPlace,
    requestGeolocation,
  };
};
