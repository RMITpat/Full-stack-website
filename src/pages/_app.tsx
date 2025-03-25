import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavBar from "@/components/NavBar";

const theme = createTheme({
    fontFamily: 'Open Sans, Sans-Serif',
    primaryColor: 'cyan',

});


export default function App({ Component, pageProps }: AppProps) {
    const [opened, { toggle }] = useDisclosure();

  return (
      <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell
              header={{ height: 60 }}
              navbar={{
                  width: 300,
                  breakpoint: 'sm',
                  collapsed: { mobile: !opened },
              }}
              padding="md"
          >
              <AppShell.Header>
                  <Burger
                      opened={opened}
                      onClick={toggle}
                      hiddenFrom="sm"
                      size="sm"
                  />
                  <div>Logo</div>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                  <NavBar/>
              </AppShell.Navbar>

              <AppShell.Main>
                  <Component {...pageProps} />
              </AppShell.Main>
          </AppShell>

      </MantineProvider>
  );
}