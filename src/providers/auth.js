import React, { useState, createContext, useContext, useEffect } from 'react';

const CurrentAuthContext = createContext({
    isAuthenticated: false,
    authenticate: () => {},
});

const CurrentAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const storageUser = sessionStorage.getItem('@app:user');
        if (storageUser) {
            setUserProfile(JSON.parse(storageUser));
            setIsAuthenticated(true);
        }
    }, []);

    const signIn = (name, password, cb) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: name, password: password }),
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(function(e) {
                if (e.success) {
                    setUserProfile(e.data);
                    sessionStorage.setItem('@app:user', JSON.stringify(e.data));
                    setIsAuthenticated(true);
                    cb(e.success);
                } else {
                    cb(e.success);
                }
            });
    };

    const signOut = () => {
        const storageUser = sessionStorage.getItem('@app:user');
        if (storageUser) {
            sessionStorage.removeItem('@app:user');
        }
        setUserProfile({});
        setIsAuthenticated(false);
    };

    return (
        <CurrentAuthContext.Provider value={{ signIn, signOut, isAuthenticated, userProfile }}>
            {children}
        </CurrentAuthContext.Provider>
    );
};

const useAuth = () => useContext(CurrentAuthContext);
export { CurrentAuthProvider, useAuth };
