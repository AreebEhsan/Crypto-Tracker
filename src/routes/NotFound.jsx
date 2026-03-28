// routes/NotFound.jsx
import { Button, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Stack align="center" mt="xl">
      <Text fw={800} size="xl">Page not found</Text>
      <Text c="dimmed">The page you are looking for doesn&apos;t exist.</Text>
      <Button onClick={() => navigate('/')}>Back to dashboard</Button>
    </Stack>
  );
}
