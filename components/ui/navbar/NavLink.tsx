import { CSSProperties, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Nav } from 'react-bootstrap';

import styles from './Navbar.module.css';

const style: CSSProperties = {
    color: '#0070f3',
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

    // console.log(asPath)

    if( hasMoreOptions ){
        return (
            <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
                style={ href === asPath ? style : undefined } //TODO: Falta revisar el active link de los dropdown
            >
                <Link href={ href } legacyBehavior>
                    <NavDropdown.Item >
                        Action
                    </NavDropdown.Item>
                </Link>
                <NavDropdown.Item href={ href }>
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={ href }>
                    Something else here
                </NavDropdown.Item>
            </NavDropdown>
        )
    }
    return (
        <Link key={ href } href={ href } locale={ locale } passHref legacyBehavior>
            <Nav.Link style={ href === asPath ? style : undefined } className={ styles.spacingNavbarOptions }>{ text }</Nav.Link>
        </Link>
    )
}
