import { useParams, useNavigate } from 'react-router-dom';
import { Card, Grid, Group, Stack, Text, Badge, Button, Loader, Alert } from '@mantine/core';
import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react';
import { useCoinData } from '../hooks/useCryptoData';
import { useWatchlist } from '../hooks/useWatchlist';
import AppShellLayout from '../components/layout/AppShellLayout';
import PriceHistoryChart from '../components/charts/PriceHistoryChart';
import { formatNumber, formatPercent } from '../utils/format';

export default function DetailView() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useCoinData(symbol);
  const { watchlist, toggleWatch } = useWatchlist();

  if (isError) {
    return (
      <Alert color="red" title="Error">
        Failed to load coin data.
        <Button mt="sm" onClick={() => refetch()}>Retry</Button>
      </Alert>
    );
  }

  const snapshot = data?.snapshot;
  const meta = data?.meta;
  const display = snapshot?.display;
  const raw = snapshot?.raw;

  const onSearchSelect = (sym) => navigate(`/coin/${sym}`);

  return (
    <AppShellLayout onSearch={onSearchSelect} searchData={[]}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group gap="sm">
            <Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate(-1)}>Back</Button>
            <Text fw={800} size="xl">{meta?.FullName || symbol}</Text>
            <Badge color="yellow" onClick={() => toggleWatch(symbol)} style={{ cursor: 'pointer' }}>
              {watchlist.includes(symbol) ? 'Watching' : 'Watch'}
            </Badge>
          </Group>
          {meta?.AssetWebsiteUrl && (
            <Button variant="light" rightSection={<IconExternalLink size={14} />} component="a" href={meta.AssetWebsiteUrl} target="_blank">
              Website
            </Button>
          )}
        </Group>

        {isLoading ? (
          <Loader />
        ) : (
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <PriceHistoryChart symbol={symbol} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card withBorder radius="md" padding="md">
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text c="dimmed">Price</Text>
                    <Text fw={700}>${display?.PRICE || '—'}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">Market Cap</Text>
                    <Text>${formatNumber(raw?.MKTCAP)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">24h Volume</Text>
                    <Text>${formatNumber(raw?.TOTALVOLUME24H)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">24h Change</Text>
                    <Text c={raw?.CHANGEPCT24HOUR >= 0 ? 'teal' : 'red'}>{formatPercent(raw?.CHANGEPCT24HOUR || 0)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">High / Low (24h)</Text>
                    <Text>${formatNumber(raw?.HIGH24HOUR)} / ${formatNumber(raw?.LOW24HOUR)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">Supply</Text>
                    <Text>{formatNumber(raw?.SUPPLY, { notation: 'compact' })}</Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        )}

        {meta?.Description && (
          <Card withBorder radius="md" padding="md">
            <Text fw={700} mb="xs">About</Text>
            <Text c="dimmed" size="sm">{meta.Description}</Text>
          </Card>
        )}
      </Stack>
    </AppShellLayout>
  );
}
