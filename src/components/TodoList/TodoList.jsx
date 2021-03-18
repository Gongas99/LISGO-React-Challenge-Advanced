import React, { useEffect, useState } from 'react';

import Todo from '../Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InplIiwic3VybmFtZSI6ImJhbmFuYSIsInNjb3BlIjoibm9ybWFsIiwiaWF0IjoxNjE2MDc5ODIyfQ.iFNVkynZbsC5mDVanAIHEND0Ln-MdFDNqIRiUBA6CQc'
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` },
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e.error);
                }
            });
    }, []);

    return (
        <>
            {todos.length !== 0
                ? todos.map(t => {
                    return (
                        <>
                            <Todo 
                                id={t.id}
                                taskName={t.description} 
                                isCompleted={t.state} 
                            />
                            <hr />
                        </>)
                })
                : 'Loading...'}
        </>
    )
}

export default TodoList;