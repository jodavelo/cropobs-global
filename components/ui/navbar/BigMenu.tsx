
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { LayoutContext } from '../../../context/layout';
import styles from './Navbar.module.css';
import { style } from './NavLink';
import { v4 as uuidv4  } from 'uuid';
import { useWindowSize } from '../../../hooks';
import Link from 'next/link';

export interface menuOption {
    menuLabel: string;
    href: string;
}

export interface menuItems {
    titleCategory: string;
    menuOptions: menuOption[];
}

export interface Props {
    title: string;
    options: menuItems[];
}

//
export const BigMenu = ({ title, options }: Props) => {
    
    const [columnWidth, setColumnWidth] = useState(0);
    const [isActive, setIsActive] = useState(false);
    let href = '/data';
    const { asPath, locale } = useRouter();
    const { 
        setIsHome, 
        setIsAboutUs, 
        setIsData, 
        setIsDataSurfaceContext,
    } = useContext( LayoutContext );
    const { width = 100 } = useWindowSize();

    useEffect(() => {
        if( width < 1000 && width > 0 ){
            setColumnWidth( 100 );
        }
        if( width > 1000 ) setColumnWidth( 100 / options.length ); 
        
    }, [ width ])
    

    const onSetIsHome = ( urlHref?: string) => {
        if( urlHref === '/' ) {
            setIsHome( true ); 
            setIsAboutUs( false );
            setIsData( false );
            setIsDataSurfaceContext( false );
        }
        else if ( urlHref === '/data' ){
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( true );
            setIsDataSurfaceContext( false );
        }
        else if ( urlHref === '/data/surface-context' ){
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( false );
            setIsDataSurfaceContext( true );
        }
        else if ( urlHref === '/about' ){
            setIsHome( false ); 
            setIsAboutUs( true );
            setIsData( false );
            setIsDataSurfaceContext( false );
        }
    }
    // console.log({asPath}) onClick={ onSetIsHome } 
    
    useEffect(() => {
        options.map( items => {
            items.menuOptions.map( category => {
                //console.log(category.href)
                if( category.href === asPath ) setIsActive( true );
            })
        })
    }, [])
    

    const onNavigateBigMenu = (url: string) => {
        onSetIsHome( url );
    }

    return (
        <div className={ styles.dropdown2 } key={ uuidv4() }>
            <button className={ styles.dropbtn2 } style={ isActive ? style : undefined }>{ title } 
                <i className="fa fa-caret-down"></i>
            </button>
            <div className={ styles['dropdown2-content'] }>
            {/* <div className={ styles.header }>
                <h2>Mega Menu</h2>
            </div>    */}
                <div className={ styles.row } style={width <= 1000 ? { display: 'flex', flexDirection: 'column' }: undefined}>
                    {
                        options.map(items => (
                            <div key={ uuidv4() } className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                                <h3>{ items.titleCategory }</h3>
                                {
                                    items.menuOptions.map(option => (
                                        <Link key={ uuidv4() } href={ option.href } legacyBehavior passHref >
                                            <a key={ uuidv4() }  onClick={ () => onNavigateBigMenu(option.href) }>{ option.menuLabel }</a>
                                        </Link>
                                    ))
                                }
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div> 
    )
}
