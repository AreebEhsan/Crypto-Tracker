import { Card, Grid, Text, Badge } from '@mantine/core';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function NewsGrid({ articles = [] }) {
  return (
    <Grid>
      {articles.map((item) => (
        <Grid.Col key={item.id} span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" padding="md" h="100%" component="a" href={item.url} target="_blank">
            <Badge size="sm" mb="xs">{item.source_info?.name}</Badge>
            <Text fw={700} mb={4}>{item.title}</Text>
            <Text c="dimmed" size="sm" mb="xs" lineClamp={2}>{item.body}</Text>
            <Text size="xs" c="dimmed">{dayjs.unix(item.published_on).format('MMM D, HH:mm')}</Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

NewsGrid.propTypes = {
  articles: PropTypes.array,
};
