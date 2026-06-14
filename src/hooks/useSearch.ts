import { useEffect, useRef, useState } from 'react';
import { fetchCities, PlaceSuggestion } from '../api/placeSuggestion';
import { useWeather } from '../context/WeatherContext';
import { useClickOutside } from './useClickOutside';

export function useSearch() {
  const { fetchWeather } = useWeather();
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(inputValue.trim());
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [inputValue]);

  // Fetch suggestions when search term changes
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

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const selectPlace = (lat: number, lng: number) => {
    fetchWeather({ lat, lng });
    setShowSuggestions(false);
  };

  const useGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeather({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return {
    inputValue,
    onInputChange,
    suggestions,
    showSuggestions,
    suggestionRef,
    selectPlace,
    useGeolocation,
  };
}
