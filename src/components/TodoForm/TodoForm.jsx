import React, { useState } from 'react';
import { useAuth } from '../../providers/';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'

import './TodoForm.scss'

const TodoForm = () => {
    const { getUserInfo } = useAuth();
    const authToken = JSON.parse(getUserInfo()).accessToken;
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
        console.log(requestOptions)

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    console.log(e.data)
                } else {
                    console.log(e.error);
                }
            });

    }

    return (
        <div className='todo-form'>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="task"
                    type="name"
                    value={newTask}
                    handleChange={handleChange}
                    label="Write new task here…"
                    required
                />
                <input id="submit-button" type="submit" />
                <label htmlFor="submit-button">
                    <Button variant="contained" color="primary">
                        Create
                    </Button>
                </label>
            </form>
        </div>
    )
}

export default TodoForm;