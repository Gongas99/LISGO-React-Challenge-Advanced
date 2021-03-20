import React from 'react';
import PropTypes from 'prop-types';
import NavbarComponent from '../Navbar';

const LayoutNavbar = ({ children }) => {
    return (
        <div className="app">
            <NavbarComponent />
            <div className="app__content">{children}</div>
        </div>
    );
};

LayoutNavbar.propTypes = {
    children: PropTypes.any,
};

export default LayoutNavbar;
