import React, { useState, createContext, useContext, useEffect } from 'react';

const CurrentAuthContext = createContext({
    isAuthenticated: false,
    authenticate: () => { },
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

    const signIn = async (name, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, password: password }),
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, requestOptions);
        const response = await result.json();
        if (response.success) {
            setUserProfile(response.data);
            sessionStorage.setItem('@app:user', JSON.stringify(response.data));
            setIsAuthenticated(true);
            return response.success;
        } else {
            return null;
        }
    };

    const signOut = () => {
        const storageUser = sessionStorage.getItem('@app:user');
        if (storageUser) {
            sessionStorage.removeItem('@app:user');
        }
        setUserProfile({});
        setIsAuthenticated(false);
    };

    const getUserInfo = () => {
        return sessionStorage.getItem('@app:user');
    }

    return (
        <CurrentAuthContext.Provider value={{ signIn, signOut, getUserInfo, isAuthenticated, userProfile }}>
            {children}
        </CurrentAuthContext.Provider>
    );
};

const useAuth = () => useContext(CurrentAuthContext);
export { CurrentAuthProvider, useAuth };
