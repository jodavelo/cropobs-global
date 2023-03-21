
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { LayoutContext } from '../../../context/layout';
import styles from './Navbar.module.css';
import { style } from './NavLink';
import { v4 as uuidv4  } from 'uuid';
import { useWindowSize } from '../../../hooks';

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
    let href = '/data';
    const { asPath, locale } = useRouter();
    const { setIsHome, setIsAboutUs, setIsData } = useContext( LayoutContext );
    const { width = 100 } = useWindowSize();

    useEffect(() => {
        if( width < 1000 && width > 0 ){
            setColumnWidth( 100 );
        }
        if( width > 1000 ) setColumnWidth( 100 / options.length ); 
        
    }, [ width ])
    

    const onSetIsHome = () => {
        if( href === '/' ) {
            setIsHome( true ); 
            setIsAboutUs( false );
            setIsData( false );
        }
        else if ( href === '/data' ){
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( true );
        }
        else if ( href === '/about' ){
            setIsHome( false ); 
            setIsAboutUs( true );
            setIsData( false );
        }
    }

    return (
        <div className={ styles.dropdown2 }>
            <button className={ styles.dropbtn2 } onClick={ onSetIsHome } style={ href.includes(asPath) && href !== '/'  ? style : undefined }>{ title } 
                <i className="fa fa-caret-down"></i>
            </button>
            <div className={ styles['dropdown2-content'] }>
            {/* <div className={ styles.header }>
                <h2>Mega Menu</h2>
            </div>    */}
                <div className={ styles.row } style={width <= 1000 ? { display: 'flex', flexDirection: 'column' }: undefined}>
                    {/* <div className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                        <h3>Category 1</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                        <h3>Category 2</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                        <h3>Category 3</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                        <h3>Category 4</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                    </div> */}

                    {
                        options.map(items => (
                            <div key={ uuidv4() } className={ styles.column } style={{ width: `${ columnWidth }%` }}>
                                <h3>{ items.titleCategory }</h3>
                                {
                                    items.menuOptions.map(option => (
                                        <a key={ uuidv4() } href={ option.href }>{ option.menuLabel }</a>
                                    ))
                                }
                            </div>
                        ))
                    }
                    {/* <div className={ styles.column }>
                        <h3>Category 1</h3>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column }>
                        <h3>Category 2</h3>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column }>
                        <h3>Category 3</h3>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <div className={ styles.column }>
                        <h3>Category 4</h3>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div> */}
                </div>
            </div>
        </div> 
    )
}
