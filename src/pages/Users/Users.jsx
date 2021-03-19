import React, { useState, useEffect } from 'react';
import User from '../../components/User';
import { useAuth } from '../../providers';

const Users = () => {
    const [users, setUsers] = useState([]);

    const { userProfile } = useAuth();
    const authToken = userProfile.accessToken;

    useEffect(() => {
        const fetchUsers = async () => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}` }})
                .then(response => response.json())
                .then(function (e) {
                    if (e.success) {
                        setUsers(e.data);
                        console.log(e)
                    } else {
                        console.log(e);
                    }
                });
        };
        fetchUsers();
    }, []);

    return (
        <>
            {users.length !== 0
                ? users.map(u => {
                    return (
                        <>
                            <User 
                                name={u.name}
                                surname={u.surname}
                            />
                            <hr />
                        </>)
                })
                : 'Loading...'}
        </>
    )
}

export default Users;
