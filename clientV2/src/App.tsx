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
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
          <ToastContainer/>
          <Grid gutter="md" columns={12}>
            <Grid.Col span={1} >
              <NavbarMinimal />              
            </Grid.Col>
            <Grid.Col span={11}>
              <AppRouter />
            </Grid.Col>
          </Grid>
          <FooterSocial/>
        </SimpleGrid>
      </MantineProvider>
    </Router>
  );
}
