import { CSSProperties, FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Nav } from 'react-bootstrap';

import styles from './Navbar.module.css';
import { LayoutContext } from '../../../context/layout';

import { v4 as uuidv4  } from 'uuid';

const style: CSSProperties = {
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
}

export const NavLink: FC<Props> = ({ text, href, hasMoreOptions, expand }) => {
    
    const { asPath, locale } = useRouter();
    const { setIsHome, setIsAboutUs, setIsData } = useContext( LayoutContext );

    const onSetIsHome = () => {
        console.log({ href })
        if( href === '/' ) {
            // console.log('entro') 
            setIsHome( true ); 
            setIsAboutUs( false );
            setIsData( false );
        }
        else if ( href === '/data' ){
            // console.log('f') 
            setIsHome( false ); 
            setIsAboutUs( false );
            setIsData( true );
        }
        else if ( href === '/about' ){
            // console.log('f') 
            setIsHome( false ); 
            setIsAboutUs( true );
            setIsData( false );
        }
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
