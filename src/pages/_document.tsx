import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import NavBar from "@/components/NavBar";

export default function Document() {
    return (
        <Html lang="en" {...mantineHtmlProps}>
            <Head>
                <ColorSchemeScript defaultColorScheme="auto" />
            </Head>
            <body>
            <NavBar/>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}