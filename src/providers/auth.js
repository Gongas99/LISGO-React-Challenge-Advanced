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

    const signIn = (user, password, cb) => {
        const requestOptions = {
            method: 'POST',
            headers: '',
            body: JSON.stringify({ user: user, password: password }),
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, requestOptions)
            .then(response => response.json())
            .then(function(e) {
                if (e.success) {
                    setUserProfile(e.data);
                    sessionStorage.setItem('@app:user', JSON.stringify(e.data));
                    setIsAuthenticated(true);
                    cb(true);
                } else {
                    cb(e.error.message);
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

    const getUserProfile = async () => {
        const requestOptions = {
            method: 'GET',
            headers: '',
        };

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userProfile._id}`, requestOptions)
            .then(response => response.json())
            .then(function(e) {
                if (e.success) {
                    setUserProfile(e.data);
                    sessionStorage.setItem('@app:user', JSON.stringify(e.data));
                } else {
                    console.log(e.error.message);
                }
            });
    };

    return (
        <CurrentAuthContext.Provider value={{ signIn, signOut, getUserProfile, isAuthenticated, userProfile }}>
            {children}
        </CurrentAuthContext.Provider>
    );
};

const useAuth = () => useContext(CurrentAuthContext);
export { CurrentAuthProvider, useAuth };
