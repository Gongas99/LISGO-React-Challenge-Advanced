import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/';

import Todo from '../Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const { getUserInfo } = useAuth();
    const authToken = JSON.parse(getUserInfo()).accessToken;
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