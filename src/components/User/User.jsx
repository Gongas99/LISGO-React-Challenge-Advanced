import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom'

const User = ({ id, name, surname }) => {
    const handleDelete = event => {
        //TODO maybe
    }

    const handleSomething = event => {
        //TODO maybe
    }

    let todoRef = `/todos/${id}`;

    return (
        <TableRow>
            <TableCell>
                {name}
            </TableCell>
            <TableCell>
                {surname}
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="open" size="small" as={Link} to={todoRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default User;