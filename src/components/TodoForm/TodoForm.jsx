import React, { useState } from 'react';
import { useTodos } from '../../providers/';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'

import './TodoForm.scss'

const TodoForm = () => {
    const [newTask, setNewTask] = useState('');
    const { addTodo } = useTodos();

    const handleChange = event => {
        setNewTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        addTodo(newTask);
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