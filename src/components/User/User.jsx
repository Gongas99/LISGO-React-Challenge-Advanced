import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom'

import GoToIcon from '../../assets/goto.svg'

const User = ({ id, name, surname }) => {
    
    const history = useHistory();

    return (
        <TableRow>
            <TableCell>
                {name}
            </TableCell>
            <TableCell>
                {surname}
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="open" size="small" onClick={() => history.push(`/todos/${id}`)}>
                    <img src={GoToIcon} alt=""/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default User;