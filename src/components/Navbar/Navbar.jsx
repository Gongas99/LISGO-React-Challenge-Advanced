import React from 'react';
import { useAuth } from '../../providers';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
    const { isAuthenticated, userProfile } = useAuth();
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">React To-Do</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        {isAuthenticated ? (
                            <>
                                {userProfile.role.name === 'admin' ? (
                                    <>
                                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                                        <Nav.Link as={Link} to="/todos">My List</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/todos">My List</Nav.Link>
                                    </>
                                )}
                                <>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );

}

export default NavbarComponent;