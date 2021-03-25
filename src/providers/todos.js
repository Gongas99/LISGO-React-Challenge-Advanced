import React, { useState, createContext, useContext } from 'react';
import { useAuth } from '../providers';

const TodoContext = createContext({
    todos: [],
    filters: {},
    setTodos: () => { }
});

/**
 * Function that converts an object in
 * @param {*} obj 
 * @returns 
 */
function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filters, setFilters] = useState({filter: null, orderBy: null});

    const { userProfile } = useAuth();
    const { accessToken } = userProfile;

    const getTodoById = (id) => {
        return todos.indexOf(todos.find(x => x.id === id))
    }

    /**
     * Get todos from another user
     * @param {*} id 
     */
    const getAnotherTodos = (id) => {
        const {filter, orderBy} = filters || {}
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };
        const url = `${process.env.REACT_APP_BACKEND_URL}/todos/user/${id}?${objectToQueryString({ filter, orderBy })}`

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e);
                }
            });
    }

    const getTodos = () => {
        const {filter, orderBy} = filters || {}
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };
        const url = `${process.env.REACT_APP_BACKEND_URL}/todos/user?${objectToQueryString({ filter, orderBy })}`

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    setTodos(e.data)
                } else {
                    console.log(e);
                }
            });
    }

    const editTodoDescription = async (id, description) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify({ description })
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions);
        const response = await result.json()
        if (response.success) {
            let todoId = getTodoById(id)
            let aux = [...todos];
            aux[todoId].description = description
            setTodos(aux);
            return true;
        } else {
            console.log(response);
            return false;
        }
    }

    const editTodoState = async (id, state) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify({ state })
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
        const response = await result.json();
        if (response.success) {
            let todoId = getTodoById(id)
            let aux = [...todos];
            aux[todoId].state = state
            setTodos(aux);
            return true;
        } else {
            console.log(response);
            return false;
        }
    }

    const deleteTodo = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, requestOptions)
        const response = await result.json();
        if (response.success) {
            let todoId = getTodoById(id)
            let aux = [...todos];
            aux.splice(todoId, 1);
            setTodos(aux);
            return true;
        } else {
            console.log(response);
            return false
        }
    }

    const addTodo = async (description) => {
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
        
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, requestOptions);
        const response = await result.json();
        if (response.success) {
            let aux = [...todos];
            aux.push(response.data)
            setTodos(aux);
            return true
        } else {
            console.log(response);
            return false;
        }
    }

    const addTodoWithId = async (description, userId) => {
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

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/user/${userId}`, requestOptions)
        const response = result.json();
        if (response.success) {
            let aux = [...todos];
            aux.push(response.data)
            setTodos(aux);
            return true;
        } else {
            console.log(response);
            return false;
        }
    }

    return (
        <TodoContext.Provider value={{ editTodoDescription, editTodoState, deleteTodo, getTodos, addTodo, getAnotherTodos, addTodoWithId, filters, setFilters, todos }}>
            {children}
        </TodoContext.Provider>
    );
};

const useTodos = () => useContext(TodoContext);
export { TodoProvider, useTodos };
