
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import styles from './Navbar.module.css';
import { NavContainer } from './';

export const NavbarComponent = () => {
    return (
        <>
            {['lg'].map((expand) => (
                <Navbar key={expand || ''} style={{
                    backgroundColor: '#D6D8D7' // TODO: Aqui para modificar el color del navbar!
                }} expand={expand} className="mb-3">
                    <Container fluid className={ styles.spaceNavbarContainer }>
                        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Opciones
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <NavContainer expand={ expand }/>
                                
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}
