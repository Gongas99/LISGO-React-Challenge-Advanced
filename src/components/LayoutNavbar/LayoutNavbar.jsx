import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';

const LayoutNavbar = ({ children }) => {
    return (
        <div className="app">
            <Navbar />
            <div className="app__content">{children}</div>
        </div>
    );
};

LayoutNavbar.propTypes = {
    children: PropTypes.any,
};

export default LayoutNavbar;
