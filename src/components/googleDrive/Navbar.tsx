import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarComponent:React.FC = () => {
    return (
        <Navbar expand="sm"  bg="light">
            <Navbar.Brand as={Link} to="/">
                Drive
            </Navbar.Brand>
            <Nav>
            <Nav.Link>
                Profile
            </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavbarComponent
