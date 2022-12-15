import { FC } from 'react';
import { v4 as uuidv4  } from 'uuid';
import { Nav } from 'react-bootstrap';


import { NavLink } from './';

interface Props {
    expand: string
}

const menuItems = [
    {
        text: 'Home',
        href: '/',
        hasMoreOptions: false
    },
    {
        text: 'Data',
        href: '/data',
        hasMoreOptions: false
    },
    {
        text: 'Link 1',
        href: '#action1',
        hasMoreOptions: false
    },
    {
        text: 'Link 2',
        href: '#action2',
        hasMoreOptions: false
    },
    {
        text: 'Link 3',
        href: '#action3',
        hasMoreOptions: false
    },
    {
        text: 'About',
        href: '#actionAbout',
        hasMoreOptions: true
    },  
];

export const NavContainer: FC<Props> = ({ expand }) => {
    return (
        <Nav className="justify-content-center flex-grow-1">
            {
                menuItems.map(({ text, href, hasMoreOptions }) => (
                    <NavLink key={ `${ uuidv4() }` } expand={ expand } href={ href } text={ text } hasMoreOptions={ hasMoreOptions }/>
                ))
            }
        </Nav>
    )
}
