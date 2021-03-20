import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/';
import { createSelector, createStructuredSelector } from 'reselect';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import Todo from '../Todo';

const TodoList = ({userId, id}) => {
    const [todos, setTodos] = useState([]);
    const [hideComplete, setHideComplete] = useState(false)

    const { userProfile } = useAuth();
    const authToken = userProfile.accessToken;
    
    if(id){
        userId = id
    }

    const completedSelector = createSelector(
        state => state.values.todos,
        state => state.values.hide,
        (todos, hide) => (todos.filter(function (t) {
            if (hide) {

            }
            return t;
        }))
    )

    const handleChange = (event) => {
        setHideComplete(event.target.checked);
    };

    useEffect(() => {
        console.log(userProfile);
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` },
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/user/${userId}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e.error);
                }
            });
    }, []);

    return (
        <>
            <TableContainer>
                <Table className="todo-table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tasks</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.length !== 0
                            ? todos.map(t => {
                                return (
                                    <>
                                        <Todo
                                            id={t.id}
                                            taskName={t.description}
                                            isDone={t.state}
                                        />
                                    </>)
                            })
                            : 'Loading...'}
                    </TableBody>
                </Table>
            </TableContainer>
            <span>Hide completed</span>
            <Checkbox
                checked={hideComplete}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </>
    )
}

export default TodoList;