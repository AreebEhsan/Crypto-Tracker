import { Card, Grid, Text, Skeleton } from '@mantine/core';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils/format';

function StatCard({ label, value }) {
  return (
    <Card withBorder padding="md" radius="md">
      <Text c="dimmed" size="sm">{label}</Text>
      <Text fw={700} size="xl">{value}</Text>
    </Card>
  );
}

export default function OverviewCards({ coins, loading }) {
  if (loading) {
    return (
      <Grid>
        {[...Array(4)].map((_, idx) => (
          <Grid.Col key={idx} span={{ base: 6, md: 3 }}>
            <Skeleton height={90} radius="md" />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  const totalMarketCap = coins.reduce((acc, c) => acc + (c.RAW?.USD?.MKTCAP || 0), 0);
  const totalVolume = coins.reduce((acc, c) => acc + (c.RAW?.USD?.TOTALVOLUME24H || 0), 0);
  const avgChange = coins.length
    ? coins.reduce((acc, c) => acc + (c.RAW?.USD?.CHANGEPCT24HOUR || 0), 0) / coins.length
    : 0;

  return (
    <Grid>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <StatCard label="Total Market Cap (Top 50)" value={`$${formatNumber(totalMarketCap)}`} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <StatCard label="24h Volume" value={`$${formatNumber(totalVolume)}`} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <StatCard label="Avg 24h Change" value={`${avgChange.toFixed(2)}%`} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <StatCard label="Tracked Coins" value={coins.length} />
      </Grid.Col>
    </Grid>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

OverviewCards.propTypes = {
  coins: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
