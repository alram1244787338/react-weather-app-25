import React, { useCallback, useEffect } from 'react';

export const useClickOutside = (element: React.RefObject<HTMLElement | null>, callback: () => void) => {
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (element.current && !element.current.contains(event.target as Node)) {
        callback();
      }
    },
    [element, callback],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
