import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  MantineProvider,
  AppShell,
  Burger,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "@/components/Nav/NavBar";
import GreetUser from "@/components/Nav/GreetUser";
import { LoginProvider } from "../contexts/LoginContext";
import { ToastContainer } from "react-toastify";
import "@mantine/charts/styles.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const theme = createTheme({
  fontFamily: "Open Sans, Sans-Serif",
  primaryColor: "cyan",
});

//Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <ToastContainer position="top-center" autoClose={1000} />

        <LoginProvider>
          <AppShell
            header={{ height: 45 }}
            navbar={{
              width: 200,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            footer={{ height: 60 }}
            padding="md"
          >
            <AppShell.Header>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <div>
                <GreetUser />
              </div>
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <NavBar />
            </AppShell.Navbar>

            <AppShell.Main>
              <Component {...pageProps} />
            </AppShell.Main>
            <AppShell.Footer p={"md"}>
              <Group justify="center">TeachTeam</Group>
            </AppShell.Footer>
          </AppShell>
        </LoginProvider>
      </MantineProvider>
    </ApolloProvider>
  );
}
