import React, { useEffect, useState } from 'react';
import { useTodos } from '../../providers/';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import { TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

import CorrectIcon from '../../assets/correct.svg'
import DeleteIcon from '../../assets/delete.svg'
import EditIcon from '../../assets/edit.svg'

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
    }, [filters]) //eslint-disable-line

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
        const result = await editTodoState(id, state);
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
                <img src={CorrectIcon} alt=""/>
            </IconButton>
            :
            <IconButton aria-label="edit" size="small" onClick={() => { startEditing(params.row.id, params.row.description) }}>
                <img src={EditIcon} alt=""/>
            </IconButton>
    ), width: 120
        },
{
    field: 'delete', headerName: ' ', renderCell: (params) => (
        <IconButton aria-label="delete" size="small" onClick={() => { handleDelete(params.row.id) }}>
                <img src={DeleteIcon} alt=""/>
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