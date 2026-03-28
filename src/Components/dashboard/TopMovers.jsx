import { Card, Table, Text, Group, Badge } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils/format';

function Row({ coin }) {
  const change = coin.RAW?.USD?.CHANGEPCT24HOUR ?? 0;
  const positive = change >= 0;
  return (
    <Table.Tr>
      <Table.Td>
        <Group gap="sm">
          <img width={28} height={28} src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} alt={coin.CoinInfo.FullName} />
          <div>
            <Text fw={600}>{coin.CoinInfo.FullName}</Text>
            <Text size="xs" c="dimmed">{coin.CoinInfo.Name}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>${formatNumber(coin.RAW?.USD?.PRICE, { maxFractionDigits: 2 })}</Table.Td>
      <Table.Td>
        <Badge color={positive ? 'teal' : 'red'} leftSection={positive ? <IconArrowUpRight size={14} /> : <IconArrowDownRight size={14} />}>
          {change.toFixed(2)}%
        </Badge>
      </Table.Td>
    </Table.Tr>
  );
}

export default function TopMovers({ coins }) {
  const sorted = [...coins].sort((a, b) => (b.RAW?.USD?.CHANGEPCT24HOUR ?? 0) - (a.RAW?.USD?.CHANGEPCT24HOUR ?? 0));
  const gainers = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  return (
    <Card withBorder padding="md" radius="md">
      <Group justify="space-between" mb="sm">
        <Text fw={700}>Top Movers</Text>
        <Text c="dimmed" size="sm">24h change</Text>
      </Group>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Asset</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>24h</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {gainers.map((coin) => (
            <Row key={coin.CoinInfo.Id} coin={coin} />
          ))}
          {losers.map((coin) => (
            <Row key={`${coin.CoinInfo.Id}-loss`} coin={coin} />
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

Row.propTypes = {
  coin: PropTypes.shape({
    CoinInfo: PropTypes.object,
    RAW: PropTypes.object,
  }).isRequired,
};

TopMovers.propTypes = {
  coins: PropTypes.array.isRequired,
};
