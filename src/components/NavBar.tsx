import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'

import '../assets/css/Navbar.css'

const NavigationBar: FC = () => {

    return (
        <Navbar expand = "lg" className="border nav w-100">
            <Navbar.Brand as={Link} to={ROUTES.HOME}>
                <img src="/Glasses_Shop_frontend/img/HeaderPic.jpg" style={{ width: '15rem', marginLeft: '1rem' }} className='brandimg'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1rem' }}/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-4">
                <Nav.Link as={Link} to={ROUTES.LENSES}>Линзы</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar