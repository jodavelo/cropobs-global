import React, { FC, useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { Topbar, NavbarComponent, Footer } from '../ui';

import styles from './Layout.module.css';
import { LayoutContext } from '../../context/layout';
import { useRouter } from 'next/router';

interface Props {
    children: React.ReactNode,
    title: string
}

export const Layout: FC<Props> = ({ children, title }) => {

    const [layoutClassName, setLayoutClassName] = useState('');
    const { asPath } = useRouter();
    const { isHome, isData, isAboutUs, isDataSurfaceContext, isDatabases, setIsHome, setIsDataSurfaceContext, setIsAboutUs, setIsDatabases } = useContext( LayoutContext );
    //console.log({ isHome, isData, isAboutUs, isDataSurfaceContext, isDatabases })
    useEffect(() => {
        if( isHome ) setLayoutClassName( styles.home );
        else if ( isData ) setLayoutClassName( styles.data );
        else if ( isDataSurfaceContext ) setLayoutClassName( styles['data-sf'] );
        else if ( isAboutUs ) setLayoutClassName( styles['about-us'] );
        else if ( isDatabases ) setLayoutClassName( styles.databases );
    }, [])
    
    useEffect(() => {
        if( asPath == '/' ) {
            setLayoutClassName( styles.home );
            setIsHome( true );
        }
        else if ( asPath == '/data/surface-context' ) { 
            setLayoutClassName( styles.data );
            setIsDataSurfaceContext( true );
        }
        else if ( asPath == '/data/surface-context' ) {
            setLayoutClassName( styles['data-sf'] );
            setIsDataSurfaceContext( true );
        }
        else if ( asPath == '/about' ) {
            setLayoutClassName( styles['about-us'] ); 
            setIsAboutUs( true );
        }
        else if ( asPath == '/about/databases' )  {
            setLayoutClassName( styles.databases );
            setIsDatabases( true );
        }
    }, [ asPath ])
    
    
    
    return (
        <div style={{ overflow: 'hidden' }}>
            <Head>
                <title>{ title }</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Topbar/>
            <NavbarComponent/>
            <main className={ layoutClassName }>
                { children }
            </main>
            <Footer/>
        </div>
    )
}

