import { FC } from 'react';
import { useRouter } from 'next/router';
import { Nav } from 'react-bootstrap';
import { v4 as uuidv4  } from 'uuid';
import styles from './Navbar.module.css';


import { menuItems, NavLink } from './';

interface Props {
    expand: string
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

const menuItems = [
    {
        text: 'Home',
        text_es: 'Inicio',
        text_pt: 'Início',
        href: '/',
        hasMoreOptions: false,
        bigMenu: {
            isHugeMenu: false
        }
    },
    {
        text: 'Data',
        href: '/data',
        text_es: 'Datos',
        text_pt: 'Dados',
        hasMoreOptions: false,
        bigMenu: {
            isHugeMenu: true,
            items: items
        }
    },
    {
        text: 'About - Observatory',
        text_es: 'Acerca del observatorio',
        text_pt: 'Sobre nós',
        href: '/about',
        hasMoreOptions: true,
        bigMenu: {
            isHugeMenu: false
        }
    },  
];

export const NavContainer: FC<Props> = ({ expand }) => {

    const { locale } = useRouter();

    return (
        <Nav className={ styles['navbar-body'] }>
        {/* <Nav className="justify-content-center flex-grow-1"> */}
            {
                menuItems.map(({ text, href, hasMoreOptions, text_es, text_pt, bigMenu }) => (
                    <NavLink key={ `${ uuidv4() }` } expand={ expand } href={ href } text={ locale == 'en' ? text : ( locale == 'es' ? text_es : text_pt ) } hasMoreOptions={ hasMoreOptions } bigMenu={ bigMenu } />
                ))
            }
        </Nav>
    )
}
