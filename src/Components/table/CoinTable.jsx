import { useMemo, useState } from 'react';
import { Card, Table, Group, Text, ActionIcon, Tooltip, Loader } from '@mantine/core';
import { IconStar, IconStarFilled, IconArrowsSort } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatNumber, formatPercent } from '../../utils/format';

const headers = [
  { key: 'name', label: 'Asset' },
  { key: 'price', label: 'Price' },
  { key: 'mktcap', label: 'Market Cap' },
  { key: 'volume', label: '24h Volume' },
  { key: 'change', label: '24h %' },
];

export default function CoinTable({ coins, watchlist, toggleWatch, loading }) {
  const [sortKey, setSortKey] = useState('mktcap');
  const [dir, setDir] = useState('desc');

  const sorted = useMemo(() => {
    const mapped = coins.map((c) => ({
      ...c,
      price: c.RAW?.USD?.PRICE ?? 0,
      mktcap: c.RAW?.USD?.MKTCAP ?? 0,
      volume: c.RAW?.USD?.TOTALVOLUME24H ?? 0,
      change: c.RAW?.USD?.CHANGEPCT24HOUR ?? 0,
    }));
    return mapped.sort((a, b) => {
      const vA = a[sortKey] || 0;
      const vB = b[sortKey] || 0;
      return dir === 'desc' ? vB - vA : vA - vB;
    });
  }, [coins, sortKey, dir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setDir('desc');
    }
  };

  return (
    <Card withBorder radius="md" padding="md">
      <Group justify="space-between" mb="sm">
        <Text fw={700}>Market Movers</Text>
        <Text c="dimmed" size="sm">Sorted by {headers.find((h) => h.key === sortKey)?.label}</Text>
      </Group>
      <Table highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {headers.map((h) => (
              <Table.Th key={h.key}>
                <ActionIcon size="sm" variant="subtle" onClick={() => handleSort(h.key)}>
                  <Group gap={4}>
                    <IconArrowsSort size={14} />
                    <Text size="sm">{h.label}</Text>
                  </Group>
                </ActionIcon>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading && (
            <Table.Tr>
              <Table.Td colSpan={headers.length + 1}>
                <Group justify="center"><Loader size="sm" /></Group>
              </Table.Td>
            </Table.Tr>
          )}
          {!loading && sorted.map((coin) => (
            <Table.Tr key={coin.CoinInfo.Id}>
              <Table.Td width={40}>
                <Tooltip label="Toggle watchlist">
                  <ActionIcon variant="subtle" color="yellow" onClick={() => toggleWatch(coin.CoinInfo.Name)}>
                    {watchlist.includes(coin.CoinInfo.Name) ? <IconStarFilled size={16} /> : <IconStar size={16} />}
                  </ActionIcon>
                </Tooltip>
              </Table.Td>
              <Table.Td>
                <Group gap="sm">
                  <img width={26} height={26} src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} alt={coin.CoinInfo.FullName} />
                  <div>
                    <Link to={`/coin/${coin.CoinInfo.Name}`}>
                      <Text fw={600}>{coin.CoinInfo.FullName}</Text>
                    </Link>
                    <Text size="xs" c="dimmed">{coin.CoinInfo.Name}</Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td>${formatNumber(coin.price, { maxFractionDigits: 2 })}</Table.Td>
              <Table.Td>${formatNumber(coin.mktcap)}</Table.Td>
              <Table.Td>${formatNumber(coin.volume)}</Table.Td>
              <Table.Td c={coin.change >= 0 ? 'teal' : 'red'}>{formatPercent(coin.change)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

CoinTable.propTypes = {
  coins: PropTypes.array.isRequired,
  watchlist: PropTypes.array.isRequired,
  toggleWatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
