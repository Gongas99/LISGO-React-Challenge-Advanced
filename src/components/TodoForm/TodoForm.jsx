import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'

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

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <FormInput
                    name="task"
                    type="name"
                    value={task}
                    handleChange={handleChange}
                    label="Write new task here…"
                    required
                />
                <Button variant="contained" color="primary">
                    Create
                </Button>
            </form>

        </>
    )
}

export default TodoForm;