import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mantine/core/styles.css';
import './index.css';
import App from './App';
import DetailView from './routes/DetailView';
import NotFound from './routes/NotFound';
import { AppThemeProvider } from './theme.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AppThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/coin/:symbol" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </AppThemeProvider>
  </QueryClientProvider>
);
