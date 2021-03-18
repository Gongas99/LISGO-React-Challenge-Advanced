import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const Todo = ({ id, taskName, isCompleted }) => {
    const handleEdit = event => {

    }

    const handleDelete = event => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InplIiwic3VybmFtZSI6ImJhbmFuYSIsInNjb3BlIjoibm9ybWFsIiwiaWF0IjoxNjE2MDc5ODIyfQ.iFNVkynZbsC5mDVanAIHEND0Ln-MdFDNqIRiUBA6CQc' },
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    console.log(e.data)
                } else {
                    console.log(e);
                }
            });
    }

    return (
        <div className="todo">
            <Checkbox
                checked={isCompleted}
                onChange={() => { }}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {taskName}
            <span className="edit-todo">
                <IconButton aria-label="edit" size="small" onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </IconButton>
            </span>

        </div>
    )
}

export default Todo;