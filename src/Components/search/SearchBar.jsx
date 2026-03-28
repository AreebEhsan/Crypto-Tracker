import { Autocomplete } from '@mantine/core';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ data = [], onSelect }) {
  const items = useMemo(
    () => data.map((coin) => `${coin.CoinInfo?.Name} — ${coin.CoinInfo?.FullName}`),
    [data]
  );

  return (
    <Autocomplete
      placeholder="Search symbol or name"
      data={items.slice(0, 50)}
      limit={50}
      onOptionSubmit={(value) => {
        const symbol = value.split(' — ')[0];
        onSelect?.(symbol);
      }}
      nothingFound="No coins"
    />
  );
}

SearchBar.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
};
