const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = 'https://min-api.cryptocompare.com/data';

async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed ${res.status}`);
  }
  const json = await res.json();
  if (json.Response === 'Error') {
    throw new Error(json.Message || 'API error');
  }
  return json;
}

export async function fetchTopCoins(limit = 50) {
  const url = `${BASE_URL}/top/mktcapfull?limit=${limit}&tsym=USD&api_key=${API_KEY}`;
  const data = await safeFetch(url);
  return data.Data || [];
}

export async function fetchCoinSnapshot(symbol) {
  const url = `${BASE_URL}/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`;
  const data = await safeFetch(url);
  return data.RAW?.[symbol]?.USD ? { raw: data.RAW[symbol].USD, display: data.DISPLAY?.[symbol]?.USD } : null;
}

export async function fetchCoinMeta(symbol) {
  const url = `${BASE_URL}/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`;
  const data = await safeFetch(url);
  return data.Data?.[symbol] || null;
}

export async function fetchHistory(symbol, range = '30d') {
  // Map ranges to endpoints/limits
  const map = {
    '24h': { path: 'histominute', limit: 1440, aggregate: 3 }, // 1 day, 3-min buckets
    '7d': { path: 'histohour', limit: 168, aggregate: 1 },
    '30d': { path: 'histohour', limit: 720, aggregate: 1 },
    '90d': { path: 'histoday', limit: 90, aggregate: 1 },
    '1y': { path: 'histoday', limit: 365, aggregate: 1 },
  };
  const cfg = map[range] || map['30d'];
  const url = `${BASE_URL}/v2/${cfg.path}?fsym=${symbol}&tsym=USD&limit=${cfg.limit}&aggregate=${cfg.aggregate}&api_key=${API_KEY}`;
  const data = await safeFetch(url);
  return data.Data?.Data || [];
}

export async function fetchNews(limit = 12) {
  const url = `${BASE_URL}/v2/news/?lang=EN&sortOrder=latest&api_key=${API_KEY}`;
  const data = await safeFetch(url);
  return (data.Data || []).slice(0, limit);
}
