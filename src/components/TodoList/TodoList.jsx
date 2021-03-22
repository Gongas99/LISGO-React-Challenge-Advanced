import React, { useEffect, useState } from 'react';
import { useTodos } from '../../providers/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import Todo from '../Todo';

import './TodoList.scss'

const TodoList = ({ id }) => {
    const [hideComplete, setHideComplete] = useState(false)

    const { todos, getTodos, getAnotherTodos } = useTodos();

    useEffect(() => {
        if (id) {
            //if admin wants another user than itself
            getAnotherTodos(id);
        }
        else {
            getTodos();
        }
    }, [getAnotherTodos, getTodos, id])

    const handleChange = (event) => {
        setHideComplete(event.target.checked);
    };

    return (
        <div className="todo-list">
            <TableContainer className="todo-table">
                <Table size="medium">
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
                                        <Todo
                                            key={t.id}
                                            id={t.id}
                                            taskName={t.description}
                                            isDone={t.state}
                                        />)
                            })
                            : 'Loading...'}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="list-checkbox">
                <span>Hide completed</span>
                <Checkbox
                    checked={hideComplete}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
        </div>
    )
}

export default TodoList;