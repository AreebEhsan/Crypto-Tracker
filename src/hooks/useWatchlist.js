import { useEffect, useState } from 'react';

const STORAGE_KEY = 'watchlistSymbols';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatch = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return { watchlist, toggleWatch };
}
