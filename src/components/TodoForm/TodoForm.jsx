import React, { useState } from 'react';
import { useTodos } from '../../providers/';
import Button from '@material-ui/core/Button';
import FormInput from '../FormInput'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './TodoForm.scss'


const TodoForm = ({ id }) => {
    const [newTask, setNewTask] = useState('');
    const { addTodo, addTodoWithId } = useTodos();

    //configure toast for this page
    toast.configure();
    
    const handleChange = event => {
        setNewTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        //if admin is accessing another user
        let result = null
        if (id) {
            result = addTodoWithId(newTask, id)
        }
        else {
            result = addTodo(newTask);
        }
        if(result){
            toast.success('Task added successfully!')
        }else {
            toast.error('Failed to add a new Task!')
        }
        setNewTask('')
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