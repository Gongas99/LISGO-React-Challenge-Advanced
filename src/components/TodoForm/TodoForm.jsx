import React, { useState } from 'react';
import { useAuth } from '../../providers/';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'

import './TodoForm.scss'

const TodoForm = () => {
    const { userProfile } = useAuth();
    const authToken = userProfile.accessToken;
    const [newTask, setNewTask] = useState('');

    const handleChange = event => {
        setNewTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                description: newTask
            })
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    //TODO reload page

                } else {
                    console.log(e.error);
                }
            });

    }

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-input">
                <FormInput
                    name="task"
                    type="name"
                    value={newTask}
                    handleChange={handleChange}
                    label="Write new task here…"
                    required
                />
            </div>
            <Button variant="contained" color="primary" type="submit" className="form-button">
                Create
            </Button>
        </form>
    )
}

export default TodoForm;