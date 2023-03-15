import { CSSProperties, FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Nav } from 'react-bootstrap';

import styles from './Navbar.module.css';
import { LayoutContext } from '../../../context/layout';

import { v4 as uuidv4  } from 'uuid';
import { BigMenu, menuItems } from './BigMenu';

export const style: CSSProperties = {
    color: '#0070f3',
    fontWeight: 'bolder'
    // textDecoration: 'underline',
}

const dropDownStyle: CSSProperties = {
    color: '#F71444 !important',
    fontWeight: 'bolder'
    // textDecoration: 'underline',
}

interface Props {
    expand: string;
    text: string;
    href: string;
    hasMoreOptions: boolean;
    isHugeMenu?: boolean;
}

const items: menuItems[] = [
    {
        titleCategory: 'Category 1',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    },
    {
        titleCategory: 'Category 2',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    },
    {
        titleCategory: 'Category 3',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    },
    {
        titleCategory: 'Category 4',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    },
    {
        titleCategory: 'Category 5',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    },
    {
        titleCategory: 'Category 6',
        menuOptions: [
            {
                menuLabel: 'Link 1',
                href: '/data'
            },
            {
                menuLabel: 'Link 2',
                href: '/data'
            },
            {
                menuLabel: 'Link 3',
                href: '/data'
            },
        ]
    }
]

export const NavLink: FC<Props> = ({ text, href, hasMoreOptions, isHugeMenu }) => {
    
    const { asPath, locale } = useRouter();
    const { setIsHome, setIsAboutUs, setIsData } = useContext( LayoutContext );

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
    // console.log(href.includes(asPath))
    // console.log({href, asPath})
    if( isHugeMenu ) {
        return (
            <BigMenu key={ uuidv4() } title='Data' options={ items } />
            // <div className={ styles.dropdown2 }>
            //     <button className={ styles.dropbtn2 } onClick={ onSetIsHome } style={ href.includes(asPath) && href !== '/'  ? style : undefined }>{ text } 
            //         <i className="fa fa-caret-down"></i>
            //     </button>
            //     <div className={ styles['dropdown2-content'] }>
            //     {/* <div className={ styles.header }>
            //         <h2>Mega Menu</h2>
            //     </div>    */}
            //     <div className={ styles.row }>
            //         <div className={ styles.column }>
            //         <h3>Category 1</h3>
            //             <Link key={ href } href={ href } locale={ locale } passHref onClick={ onSetIsHome } >
            //                 Data SF
            //             </Link>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //         <div className={ styles.column }>
            //         <h3>Category 2</h3>
            //             <a href="#">Link 1</a>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //         <div className={ styles.column }>
            //         <h3>Category 3</h3>
            //             <a href="#">Link 1</a>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //         <div className={ styles.column }>
            //         <h3>Category </h3>
            //             <a href="#">Link 1</a>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //     </div>
            //     </div>
            // </div> 
        );
    }
    
    if( hasMoreOptions ){
        
        return (
            // <NavDropdown
            //     title="Dropdown"
            //     id={`offcanvasNavbarDropdown-expand-${expand}`}
            //     style={ href === asPath ? dropDownStyle : undefined } //TODO: Falta revisar el active link de los dropdown
            // >
            //     <Link href={ href } legacyBehavior passHref>
            //         <NavDropdown.Item  onClick={ onSetIsHome }>
            //             { text }
            //         </NavDropdown.Item>
            //     </Link>
            //     {/* <NavDropdown.Item href={ href }>
            //         { text }
            //     </NavDropdown.Item>
            //     <NavDropdown.Divider />
            //     <NavDropdown.Item href={ href }>
            //         Something else here
            //     </NavDropdown.Item> */}
            // </NavDropdown>
            <div className={styles.dropdown} >
                {/* <button className={ styles.dropbtn } style={{ padding: 0, border:'none', background: 'none',  }} >About  */}
                <div className={ styles.dropbtn } style={ href === asPath ? style : undefined } >About 
                    <i className="fa fa-caret-down"></i>
                </div>
                <div className={ styles['dropdown-content'] }>
                    <Link key={ href } href={ href } locale={ locale } passHref legacyBehavior>
                        <Nav.Link onClick={ onSetIsHome }>{ text }</Nav.Link>
                    </Link>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div> 
        )
    }
    return (
        <Link key={ href } href={ href } locale={ locale } passHref legacyBehavior>
            <Nav.Link onClick={ onSetIsHome } style={ href === asPath ? style : undefined } className={ styles.spacingNavbarOptions }>{ text }</Nav.Link>
        </Link>
    )
}
