import { Stack, Grid, Group, Loader, Text, Alert, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTopCoins, useMarketNews } from './hooks/useCryptoData';
import { useWatchlist } from './hooks/useWatchlist';
import AppShellLayout from './Components/layout/AppShellLayout';
import OverviewCards from './Components/dashboard/OverviewCards';
import TopMovers from './Components/dashboard/TopMovers';
import CoinTable from './Components/table/CoinTable';
import NewsGrid from './Components/news/NewsGrid';

function HomePage() {
  const { data: coins = [], isLoading, isError, refetch } = useTopCoins(60);
  const { data: news = [] } = useMarketNews(8);
  const { watchlist, toggleWatch } = useWatchlist();
  const navigate = useNavigate();

  if (isError) {
    return (
      <Alert color="red" title="Data error">
        Could not load market data. Please check your API key and try again.
        <Button mt="sm" onClick={() => refetch()}>Retry</Button>
      </Alert>
    );
  }

  const onSearchSelect = (symbol) => navigate(`/coin/${symbol}`);

  return (
    <AppShellLayout onSearch={onSearchSelect} searchData={coins}>
      <Stack gap="lg">
        <OverviewCards coins={coins} loading={isLoading} />
        <Grid>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <TopMovers coins={coins} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <CoinTable coins={coins} watchlist={watchlist} toggleWatch={toggleWatch} loading={isLoading} />
          </Grid.Col>
        </Grid>
        <div>
          <Group mb="xs" justify="space-between">
            <Text fw={700}>Market News</Text>
            <Text c="dimmed" size="sm">Powered by CryptoCompare</Text>
          </Group>
          {isLoading ? <Loader /> : <NewsGrid articles={news} />}
        </div>
      </Stack>
    </AppShellLayout>
  );
}

export default HomePage;
