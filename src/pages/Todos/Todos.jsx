import React from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import './Todos.scss'

const Todos = (props) => {
    const { id } = props.match.params || {};
    return (
        <div className="todos">
            <TodoForm id={id}/>
            <br/>
            <TodoList id={id}/>
        </div>
    )
}

export default Todos;