import { MantineProvider, createTheme } from '@mantine/core';
import PropTypes from 'prop-types';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  defaultRadius: 'md',
});

export function AppThemeProvider({ children }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
