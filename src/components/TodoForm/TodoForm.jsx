import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'

import './TodoForm.scss'

/**
 * Material UI function to use styles
 */
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const TodoForm = () => {
    const classes = useStyles();

    const [newTask, setNewTask] = useState({
        task: '',
    });
    const { task } = newTask;

    const handleChange = event => {
        const { value, name } = event.target;

        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InplIiwic3VybmFtZSI6ImJhbmFuYSIsInNjb3BlIjoibm9ybWFsIiwiaWF0IjoxNjE2MDc5ODIyfQ.iFNVkynZbsC5mDVanAIHEND0Ln-MdFDNqIRiUBA6CQc'
            },
            body: JSON.stringify({
                description: task
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
                    value={task}
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