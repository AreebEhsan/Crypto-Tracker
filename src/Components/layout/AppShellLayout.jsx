import { AppShell, Group, Text, Anchor, ActionIcon, Flex } from '@mantine/core';
import { IconBrandGithub, IconMoonStars, IconSunHigh } from '@tabler/icons-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../search/SearchBar';

export default function AppShellLayout({ children, onSearch, searchData }) {
  const [dark, setDark] = useState(true);

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: 'sm' }}
      padding="md"
      withBorder={false}
      styles={{ main: { background: 'radial-gradient(120% 120% at 10% 10%, #0f172a 0%, #0a0f1c 45%, #070a14 100%)' } }}
    >
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Group>
            <Text fw={800} size="lg">Nova Crypto Desk</Text>
            <Text c="dimmed">Professional analytics</Text>
          </Group>
          <Group>
            <ActionIcon
              variant="light"
              color="gray"
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <IconSunHigh size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              component="a"
              href="https://github.com"
              target="_blank"
              aria-label="GitHub"
            >
              <IconBrandGithub size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Flex direction="column" gap="lg">
          <div>
            <Text fw={700} size="lg">Market</Text>
            <Text c="dimmed" size="sm">Overview & watchlist</Text>
          </div>
          <div>
            <Text fw={600} size="sm" mb={6}>Search</Text>
            <SearchBar data={searchData} onSelect={onSearch} />
          </div>
          <Group gap="xs">
            <Anchor href="https://www.cryptocompare.com/" target="_blank" c="dimmed" size="sm">Powered by CryptoCompare</Anchor>
          </Group>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

AppShellLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onSearch: PropTypes.func,
  searchData: PropTypes.array,
};
