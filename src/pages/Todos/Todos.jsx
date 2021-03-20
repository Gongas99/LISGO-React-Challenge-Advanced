import React, { useState } from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import Checkbox from '@material-ui/core/Checkbox';

import { useAuth } from '../../providers/';

const Todos = () => {
    const [hideComplete, setHideComplete] = useState(false)
    const { userProfile } = useAuth();

    const handleChange = (event) => {
        setHideComplete(event.target.checked);
    };

    return (
        <div className="todos">
            <TodoForm />
            <p>Tasks</p>
            <hr />
            <TodoList
                userId={userProfile.id}
                hide={hideComplete}
            />
            <span>Hide completed</span>
            <Checkbox
                checked={hideComplete}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    )
}

export default Todos;