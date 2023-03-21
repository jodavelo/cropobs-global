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
    if( bigMenu?.isHugeMenu ) {
        return (
            // console.log(bigMenu.isHugeMenu, bigMenu.items)
            <BigMenu key={ uuidv4() } title='Data' options={ bigMenu.items! } />
        );
    }
    
    if( hasMoreOptions ){
        
        return (
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
        <div className={styles.dropdown}>
            <Link key={ href } href={ href } locale={ locale } passHref legacyBehavior>
                <Nav.Link onClick={ onSetIsHome } style={ href === asPath ? style : undefined } className={ styles.spacingNavbarOptions }>{ text }</Nav.Link>
            </Link>
        </div>
    )
}
