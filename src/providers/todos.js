import React, { useState, createContext, useContext } from 'react';
import { useAuth } from '../providers';

const TodoContext = createContext({
    todos: [],
    setTodos: () => {}
});

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const { userProfile } = useAuth();
    const { accessToken } = userProfile;
    const userId = userProfile.id;

    const getTodoById = (id) => {
        return todos.indexOf(todos.find(x => x.id === id))
    }

    /**
     * Get todos from another user
     * @param {*} id 
     */
    const getAnotherTodos = (id) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/user/${id}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e.error);
                }
            });
    }

    const getTodos = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/user/`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e.error);
                }
            });
    }

    const editTodoDescription = (id, description) => {
        console.log(description)
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify({ description })
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    let todoId = getTodoById(id)
                    let aux = [...todos];
                    aux[todoId].description = description
                    setTodos(aux);
                    return true;
                } else {
                    console.log(e);
                    return false;
                }
            });
    }

    const editTodoState = (id, state) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify({ state })
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    let todoId = getTodoById(id)
                    let aux = [...todos];
                    aux[todoId].state = state
                    setTodos(aux);
                } else {
                    console.log(e);
                }
            });
    }

    const deleteTodo = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    let todoId = getTodoById(id)
                    let aux = [...todos];
                    aux.splice(todoId, 1);
                    setTodos(aux);
                } else {
                    console.log(e);
                }
            });
    }

    const addTodo = (description) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                description
            })
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    let aux = [...todos];
                    aux.push(e.data)
                    setTodos(aux);
                } else {
                    console.log(e.error);
                }
            });
    }

    const addTodoWithId = (description, userId) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                description
            })
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/user/${userId}`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    let aux = [...todos];
                    aux.push(e.data)
                    setTodos(aux);
                } else {
                    console.log(e.error);
                }
            });
    }

    return (
        <TodoContext.Provider value={{ editTodoDescription, editTodoState, deleteTodo, getTodos, addTodo, getAnotherTodos, addTodoWithId, todos }}>
            {children}
        </TodoContext.Provider>
    );
};

const useTodos = () => useContext(TodoContext);
export { TodoProvider, useTodos };
