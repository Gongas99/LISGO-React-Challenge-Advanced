import React, { useEffect, useState } from 'react';
import { useTodos } from '../../providers/';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import { TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './TodoList.scss'

const TodoList = ({ id }) => {
    const [hideComplete, setHideComplete] = useState(false)
    const { todos, getTodos, getAnotherTodos, filters, setFilters, editTodoDescription, deleteTodo, editTodoState } = useTodos();

    const [editingId, setEditingId] = useState(null)
    const [descriptionAux, setDescriptionAux] = useState('');

    //configure toast for this page
    toast.configure();

    const startEditing = (id, actualDescription) => {
        setDescriptionAux(actualDescription);
        setEditingId(id);
    }

    const stopEditing = async (newDescription) => {
        const result = await editTodoDescription(editingId, descriptionAux);
        if(!result){
            setDescriptionAux(newDescription);
            toast.error('Failed to update the task!')
        }
        else{
            toast.success('Task updated successfully!')
        }
        setEditingId(null);
    }

    useEffect(() => {
        if (id) {
            //if admin wants another user than itself
            getAnotherTodos(id);
        }
        else {
            getTodos();
        }
    }, [filters])

    const handleChange = (event) => {
        const aux = { ...filters };
        aux.filter = event.target.checked ? 'INCOMPLETE' : 'ALL'
        setFilters(aux);
        setHideComplete(event.target.checked);
    };

    const handleDelete = async (id) => {
        const result = await deleteTodo(id);
        if(result){
            toast.success('Task Deleted Successfully!');
        }
        else{
            toast.error('Failed to delete task!');
        }
    }

    const handleComplete = async (id, state) => {
        const result = editTodoState(id, state);
        if(result){
            toast.success('Task Changed Successfully!')
        }else{
            toast.error('Failed to change task state!')
        }
    }

    const columns = [
        {
            field: 'state', headerName: 'Done?', width: 95, renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    onChange={() => { handleComplete(params.row.id, !params.value) }}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            )
        },
        {
            field: 'description', headerName: 'Task', width: 465, renderCell: (params) => (
                (editingId === params.row.id) ? <TextField onChange={(e) => { setDescriptionAux(e.target.value) }} value={descriptionAux} /> : params.value
            )
        },
        {
            field: 'dateAdded', headerName: 'Date', renderCell: (params) => {
                var d = new Date(params.value)
                return [d.getDate(),
                d.getMonth() + 1,
                d.getFullYear()].join('/') + ' ' +
                    [d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
            }, width: 150
        },
{
    field: 'edit', headerName: ' ', renderCell: (params) => (
        (editingId === params.row.id) ?
            <IconButton aria-label="edit" size="small" onClick={() => { stopEditing() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </IconButton>
            :
            <IconButton aria-label="edit" size="small" onClick={() => { startEditing(params.row.id, params.row.description) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </IconButton>
    ), width: 120
        },
{
    field: 'delete', headerName: ' ', renderCell: (params) => (
        <IconButton aria-label="delete" size="small" onClick={() => { handleDelete(params.row.id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </IconButton>
    ), width: 120
},

    ];

return (
    <div className="todo-list">
        <DataGrid rows={todos} columns={columns} pageSize={10} autoHeight />
        <div className="list-checkbox">
            <span>Hide completed</span>
            <Checkbox
                checked={hideComplete}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    </div>
)
}

export default TodoList;