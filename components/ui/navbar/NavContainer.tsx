import { FC } from 'react';
import { useRouter } from 'next/router';
import { Nav } from 'react-bootstrap';
import { v4 as uuidv4  } from 'uuid';


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
        hasMoreOptions: false
    },
    {
        text: 'Data',
        href: '/data',
        text_es: 'Datos',
        text_pt: 'Dados',
        hasMoreOptions: false
    },
    {
        text: 'Test',
        href: '/test',
        text_es: 'Test',
        text_pt: 'Test',
        hasMoreOptions: false
    },
    // {
    //     text: 'Link 1',
    //     href: '#action1',
    //     text_es: 'Link 1',
    //     text_pt: 'Link 1',
    //     hasMoreOptions: false
    // },
    // {
    //     text: 'Link 2',
    //     href: '#action2',
    //     text_es: 'Link 2',
    //     text_pt: 'Link 2',
    //     hasMoreOptions: false
    // },
    // {
    //     text: 'Link 3',
    //     text_es: 'Link 3',
    //     text_pt: 'Link 3',
    //     href: '#action3',
    //     hasMoreOptions: false
    // },
    {
        text: 'About - Observatory',
        text_es: 'Acerca del observatorio',
        text_pt: 'Sobre nós',
        href: '/about',
        hasMoreOptions: true
    },  
];

export const NavContainer: FC<Props> = ({ expand }) => {

    const { locale } = useRouter();

    return (
        <Nav className="justify-content-center flex-grow-1">
            {
                menuItems.map(({ text, href, hasMoreOptions, text_es, text_pt }) => (
                    <NavLink key={ `${ uuidv4() }` } expand={ expand } href={ href } text={ locale == 'en' ? text : ( locale == 'es' ? text_es : text_pt ) } hasMoreOptions={ hasMoreOptions }/>
                ))
            }
        </Nav>
    )
}
