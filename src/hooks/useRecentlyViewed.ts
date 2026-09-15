import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 12;

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useLocalStorage<string[]>(
    'recentlyViewed',
    [],
  );

  const addRecent = useCallback(
    (itemId: string) => {
      setRecentIds(prev =>
        [itemId, ...prev.filter(id => id !== itemId)].slice(0, MAX_RECENT),
      );
    },
    [setRecentIds],
  );

  return { recentIds, addRecent };
};
