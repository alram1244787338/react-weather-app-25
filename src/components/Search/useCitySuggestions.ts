import { useEffect, useState } from 'react';
import { fetchCities, PlaceSuggestion } from '../../api/placeSuggestion';

/**
 * Data-preparation layer for place search: debounces the raw input, fetches
 * matching cities, and returns the suggestions. Visibility and selection are the
 * caller's concern — this hook only owns the suggestion data.
 */
export const useCitySuggestions = (inputValue: string) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setQuery(inputValue.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    let isActive = true;

    fetchCities(query).then((res) => {
      if (isActive) {
        setSuggestions(res);
      }
    });

    return () => {
      isActive = false;
    };
  }, [query]);

  return { query, suggestions };
};
