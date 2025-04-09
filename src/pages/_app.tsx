import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import {useEffect} from 'react';

import { createTheme, MantineProvider, AppShell, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import NavBar from "@/components/Nav/NavBar";
import GreetUser from "@/components/Nav/GreetUser";
import DummyLocalStore from "@/api/DummyLocalStore";
import {LoginProvider} from './contexts/LoginContext';
import DummyApplications from "@/api/DummyApplications";
import InsertUsers from "@/api/InsertUsers";
import InsertUserCreds from "@/api/InsertUserCreds";

const theme = createTheme({
    fontFamily: 'Open Sans, Sans-Serif',
    primaryColor: 'cyan',

});

export default function App({ Component, pageProps }: AppProps) {
    const [opened, { toggle }] = useDisclosure();
    //useEffect (()=> {DummyLocalStore();}, []); //populates local storage with sample user data on 1st load
    useEffect (()=> {InsertUsers();}, []);
    useEffect (()=> {InsertUserCreds();}, [InsertUsers]);
    // useEffect(() => {
    //     const apps = DummyApplications();
    //     localStorage.setItem("Credentials", JSON.stringify(apps));
    //     }, [InsertUsers]);


  return (
      <MantineProvider theme={theme} defaultColorScheme="light">
        <LoginProvider>
          <AppShell
              header={{ height: 45 }}
              navbar={{
                  width: 200,
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
                  <div><GreetUser/></div>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                  <NavBar/>
              </AppShell.Navbar>

              <AppShell.Main>
                  <Component {...pageProps} />
              </AppShell.Main>
          </AppShell>
          </LoginProvider>

      </MantineProvider>
  );
}