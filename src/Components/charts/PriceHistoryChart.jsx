import { Card, Group, SegmentedControl, Text, Loader } from '@mantine/core';
import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { useHistory } from '../../hooks/useCryptoData';
import PropTypes from 'prop-types';

export default function PriceHistoryChart({ symbol }) {
  const [range, setRange] = useState('30d');
  const { data, isLoading, refetch } = useHistory(symbol, range);

  useEffect(() => {
    refetch();
  }, [range, refetch]);

  const mapped = (data || []).map((d) => ({
    time: dayjs.unix(d.time).format(range === '24h' ? 'HH:mm' : 'MMM D'),
    price: d.close,
    high: d.high,
    low: d.low,
    volume: d.volumeto,
  }));

  return (
    <Card withBorder radius="md" padding="md">
      <Group justify="space-between" mb="sm">
        <div>
          <Text fw={700}>{symbol} price</Text>
          <Text c="dimmed" size="sm">{range} performance</Text>
        </div>
        <SegmentedControl
          value={range}
          onChange={setRange}
          data={[
            { label: '24h', value: '24h' },
            { label: '7d', value: '7d' },
            { label: '30d', value: '30d' },
            { label: '90d', value: '90d' },
            { label: '1y', value: '1y' },
          ]}
        />
      </Group>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={mapped}>
            <Line type="monotone" dataKey="price" stroke="#5B8DEF" dot={false} strokeWidth={2} />
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
            <XAxis dataKey="time" tick={{ fill: '#9aa5b1' }} />
            <YAxis tick={{ fill: '#9aa5b1' }} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0b1324', border: '1px solid #1f2a3d' }}
              labelStyle={{ color: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

PriceHistoryChart.propTypes = {
  symbol: PropTypes.string.isRequired,
};
