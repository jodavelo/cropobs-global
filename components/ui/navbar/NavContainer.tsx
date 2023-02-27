import { FC } from 'react';
import { useRouter } from 'next/router';
import { Nav } from 'react-bootstrap';
import { v4 as uuidv4  } from 'uuid';
import styles from './Navbar.module.css';


import { NavLink } from './';

interface Props {
    expand: string
}

const menuItems = [
    {
        text: 'Home',
        text_es: 'Inicio',
        text_pt: 'Início',
        href: '/',
        hasMoreOptions: false,
        isHugeMenu: false
    },
    {
        text: 'Data',
        href: '/data',
        text_es: 'Datos',
        text_pt: 'Dados',
        hasMoreOptions: false,
        isHugeMenu: true
    },
    {
        text: 'About - Observatory',
        text_es: 'Acerca del observatorio',
        text_pt: 'Sobre nós',
        href: '/about',
        hasMoreOptions: true,
        isHugeMenu: false
    },  
];

export const NavContainer: FC<Props> = ({ expand }) => {

    const { locale } = useRouter();

    return (
        <Nav className={ styles['navbar-body'] }>
        {/* <Nav className="justify-content-center flex-grow-1"> */}
            {
                menuItems.map(({ text, href, hasMoreOptions, text_es, text_pt, isHugeMenu }) => (
                    <NavLink key={ `${ uuidv4() }` } expand={ expand } href={ href } text={ locale == 'en' ? text : ( locale == 'es' ? text_es : text_pt ) } hasMoreOptions={ hasMoreOptions } isHugeMenu={ isHugeMenu } />
                ))
            }
        </Nav>
    )
}
