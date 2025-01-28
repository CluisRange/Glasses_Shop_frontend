import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'

import '../assets/css/Navbar.css'

const NavigationBar: FC = () => {

    return (
        <Navbar className="border nav w-100">
            <Navbar.Brand as={Link} to={ROUTES.HOME}>
            <img src="..\src\assets\img\HeaderPic.jpg" style={{ height: '4rem', marginLeft: '1rem' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1rem' }}/>
            <Nav className="me-auto">
                <Nav.Link as={Link} to={ROUTES.LENSES}>Линзы</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar