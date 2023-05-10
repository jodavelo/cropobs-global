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
    color: '#a1a1a1',
    fontWeight: 'bolder'
    // textDecoration: 'underline',
}

const dropDownStyle: CSSProperties = {
    color: '#F71444 !important',
    fontWeight: 'bolder'
    // textDecoration: 'underline',
}

interface hugeMenu {
    isHugeMenu?: boolean;
    items?: menuItems[]
}

interface Props {
    expand: string;
    text: string;
    href: string;
    hasMoreOptions: boolean;
    bigMenu?: hugeMenu;
}

export const NavLink: FC<Props> = ({ text, href, hasMoreOptions, bigMenu }) => {

    const { asPath, locale } = useRouter();
    const { setIsHome, setIsAboutUs, setIsData, setIsDataSurfaceContext } = useContext( LayoutContext );

    const onSetIsHome = () => {
        if( asPath === '/' ) {
            setIsHome( true ); 
            setIsAboutUs( false );
            setIsData( false );
            setIsDataSurfaceContext( false );
        }
        else if ( asPath === '/data' ){
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( true );
            setIsDataSurfaceContext( false );
        }
        else if ( asPath === '/data/surface-context' ){
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( false );
            setIsDataSurfaceContext( true );
        }
        else if ( asPath === '/about' ){
            setIsHome( false ); 
            setIsAboutUs( true );
            setIsData( false );
            setIsDataSurfaceContext( false );
        }
    }
    // console.log(href.includes(asPath))
    // console.log({href, asPath})
    if( bigMenu?.isHugeMenu ) {
        return (
            // console.log(bigMenu.isHugeMenu, bigMenu.items)
            <BigMenu key={ uuidv4() } title='Data' options={ bigMenu.items! } href={href} />
        );
    }
    
    if( hasMoreOptions ){
        
        return (
            <div className={styles.dropdown} key={ uuidv4() } >
                {/* <button className={ styles.dropbtn } style={{ padding: 0, border:'none', background: 'none',  }} >About  */}
                <div className={ styles.dropbtn } style={ asPath.includes(href) ? style : undefined } >About 
                    <i className="fa fa-caret-down"></i>
                </div>
                <div className={ styles['dropdown-content'] }>
                    <Link key={ uuidv4() } href={ href } locale={ locale } passHref legacyBehavior>
                        <Nav.Link onClick={ onSetIsHome } style={ href === asPath ? style : undefined }>{ text }</Nav.Link>
                    </Link>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div> 
        )
    }
    return (
        <div className={styles.dropdown} key={ uuidv4() }>
            <Link key={ href } href={ href } locale={ locale } passHref legacyBehavior>
                <Nav.Link onClick={ onSetIsHome } style={ href === asPath ? style : undefined } className={ styles.spacingNavbarOptions }>{ text }</Nav.Link>
            </Link>
        </div>
    )
}
