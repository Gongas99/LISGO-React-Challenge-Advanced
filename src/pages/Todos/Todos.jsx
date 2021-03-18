import React, { useState } from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import Checkbox from '@material-ui/core/Checkbox';

const Todos = () => {
    const [hideComplete, setHideComplete] = useState(false)

    const handleChange = (event) => {
        setHideComplete(event.target.checked);
      };

    return (
        <>
            <TodoForm />
            <p>Tasks</p>
            <hr />
            <TodoList />
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

export default Todos;