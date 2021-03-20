import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers';

import './Navbar.scss';

const Navbar = () => {
    const { isAuthenticated, userProfile } = useAuth();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="navbar">
                <Link to="/">
                    React To-Do
                </Link>
                <div className="navbar__desktop">
                    <ul className="navbar__items">

                        {isAuthenticated ? (
                            <>
                                {userProfile.role.name === 'admin' ? (
                                    <>
                                        <li>
                                            <Link to="/users">Users</Link>
                                        </li>
                                        <li>
                                            <Link to="/todos">My List</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/todos">My List</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );

}

export default Navbar;