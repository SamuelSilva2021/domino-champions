import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';
import { AppRouter } from './Router';
import { theme } from './theme';
import { NavbarMinimal } from './components/NavbarMinimal/NavbarMinimal';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import { FooterSocial } from './components/FooterSocial/FooterSocial';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Router>
      <MantineProvider theme={theme}>
        <ToastContainer />
        <Grid columns={12}>
          <Grid.Col span="content">
            <NavbarMinimal />
          </Grid.Col>
          <Grid.Col span={{ base: 9, sm: 3, md: 6, lg: 11 }}>
            <AppRouter />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </Router>
  );
}
