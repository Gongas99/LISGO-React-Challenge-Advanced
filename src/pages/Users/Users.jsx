import React, { useState, useEffect } from 'react';
import User from '../../components/User';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { useAuth } from '../../providers';

import './Users.scss'

const Users = () => {
    const [users, setUsers] = useState([]);

    const { userProfile } = useAuth();
    const authToken = userProfile.accessToken;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}` } })
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setUsers(e.data);
                    console.log(e)
                } else {
                    console.log(e);
                }
            });
    }, []);

    return (
        <div className="users">
            <h2>Users</h2>
            <TableContainer className="users-table">
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell align="right">To-Do</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length !== 0
                            ? users.map(u => {
                                return (
                                        <User
                                            key={u.id}
                                            id={u.id}
                                            name={u.name}
                                            surname={u.surname}
                                        />)
                            })
                            : 'Loading...'}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users;
