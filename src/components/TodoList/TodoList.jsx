import React, { useEffect, useState } from 'react';
import { useTodos } from '../../providers/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Todo from '../Todo';

import './TodoList.scss'

const TodoList = ({ id }) => {
    const [hideComplete, setHideComplete] = useState(false)
    const { todos, getTodos, getAnotherTodos, filters, setFilters } = useTodos();

    useEffect(() => {
        if (id) {
            //if admin wants another user than itself
            getAnotherTodos(id);
        }
        else {
            getTodos();
        }
    }, [filters])

    const handleChange = (event) => {
        const aux = { ...filters };
        aux.filter = event.target.checked ? 'INCOMPLETE' : 'ALL'
        setFilters(aux);
        setHideComplete(event.target.checked);
    };
    return (
        <div className="todo-list">
            <TableContainer className="todo-table">
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Done?</TableCell>
                            <TableCell>
                                Task Name
                            </TableCell>
                            <TableCell>
                                Date Added
                            </TableCell>
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
                                        dateAdded={t.dateAdded}
                                        isDone={t.state}
                                    />)
                            })
                            : 'No Tasks Available'}
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