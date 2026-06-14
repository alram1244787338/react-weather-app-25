import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCities, PlaceSuggestion } from '../api/placeSuggestion';
import { useClickOutside } from './useClickOutside';

export type UseSearchSuggestionsReturn = {
  inputValue: string;
  suggestions: PlaceSuggestion[];
  showSuggestions: boolean;
  suggestionListRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideSuggestions: () => void;
};

/**
 * Manages search input, debounced fetching of city suggestions,
 * and dropdown visibility (including click-outside dismissal).
 *
 * Does NOT trigger weather queries — that responsibility belongs to the caller.
 */
export const useSearchSuggestions = (): UseSearchSuggestionsReturn => {
  const suggestionListRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce input → searchTerm (300ms)
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(inputValue.trim());
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [inputValue]);

  // Fetch suggestions when searchTerm changes
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

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  // Click outside closes dropdown
  useClickOutside(suggestionListRef, hideSuggestions);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return {
    inputValue,
    suggestions,
    showSuggestions,
    suggestionListRef,
    onInputChange,
    hideSuggestions,
  };
};
