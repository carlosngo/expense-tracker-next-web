import React, { ReactNode } from 'react';
import Head from 'next/head';
import {Anchor, Breadcrumbs, Container, Space} from '@mantine/core';
import AppNavbar from "./AppNavbar";
import {useRouter} from "next/router";


type Props = {
    children?: ReactNode
    title?: string
}

interface BreadcrumbLink {
    name: string;
    url: string;
}

const Layout = ({ children, title }: Props) => {
    const navbarWidth = 250;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <AppNavbar navbarWidth={navbarWidth}/>
            <Container ml={navbarWidth} py='xl' px='xl' fluid style={{position: 'relative', minHeight: '100vh', backgroundColor: '#ecf0f5'}}>
                {children}
            </Container>
        </div>
    )
}

export default Layout