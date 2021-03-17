import React from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import Checkbox from '@material-ui/core/Checkbox';

const Todos = () => {
    return (
        <>
            <TodoForm />
            <p>Tasks</p>
            <br />
            <TodoList />
            <br />
            Hide completed
            <Checkbox
                checked={true}
                onChange={() => { }}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </>
    )
}

export default Todos;