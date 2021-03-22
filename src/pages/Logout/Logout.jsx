import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Providers
import { useAuth } from '../../providers';

const Logout = () => {
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    }, [signOut]);

    return (
        <Redirect to="/" />
    );
}


export default Logout;
