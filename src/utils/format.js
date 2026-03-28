export const formatNumber = (num, options = {}) => {
  if (num === undefined || num === null || Number.isNaN(num)) return '–';
  const formatter = new Intl.NumberFormat('en-US', {
    notation: options.notation || 'compact',
    maximumFractionDigits: options.maxFractionDigits ?? 2,
  });
  return formatter.format(num);
};

export const formatCurrency = (num, options = {}) =>
  formatNumber(num, { notation: 'compact', maxFractionDigits: options.maxFractionDigits ?? 2, currency: 'USD' });

export const formatPercent = (num) => {
  if (num === undefined || num === null || Number.isNaN(num)) return '–';
  return `${num.toFixed(2)}%`;
};
