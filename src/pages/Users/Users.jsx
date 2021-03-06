import React, { useState, useEffect } from 'react';
import User from '../../components/User';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useAuth } from '../../providers';

import './Users.scss'

const Users = () => {
    const [users, setUsers] = useState([]);

    const { userProfile } = useAuth();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, { method: 'GET', headers: { 'Authorization': `Bearer ${userProfile.accessToken}` } })
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setUsers(e.data);
                } else {
                    console.log(e);
                }
            });
    }, []); //eslint-disable-line

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
                            : <TableRow>
                                <TableCell>'No Users Available'</TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users;
