import { useQuery } from '@tanstack/react-query';
import { fetchTopCoins, fetchCoinSnapshot, fetchCoinMeta, fetchHistory, fetchNews } from '../api/cryptoApi';

export function useTopCoins(limit = 50) {
  return useQuery({
    queryKey: ['topCoins', limit],
    queryFn: () => fetchTopCoins(limit),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useCoinData(symbol) {
  return useQuery({
    queryKey: ['coin', symbol],
    queryFn: async () => {
      const [snapshot, meta] = await Promise.all([fetchCoinSnapshot(symbol), fetchCoinMeta(symbol)]);
      return { snapshot, meta };
    },
    enabled: Boolean(symbol),
    staleTime: 1000 * 30,
  });
}

export function useHistory(symbol, range) {
  return useQuery({
    queryKey: ['history', symbol, range],
    queryFn: () => fetchHistory(symbol, range),
    enabled: Boolean(symbol),
    staleTime: 1000 * 30,
  });
}

export function useMarketNews(limit = 8) {
  return useQuery({
    queryKey: ['news', limit],
    queryFn: () => fetchNews(limit),
    staleTime: 1000 * 300,
  });
}
