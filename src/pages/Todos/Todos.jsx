import React, { useState } from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import { useAuth } from '../../providers/';

import './Todos.scss'

const Todos = (props) => {
    const { userProfile } = useAuth();
    const { id } = props.match.params || {};
    return (
        <div className="todos">
            <TodoForm />
            <br/>
            <TodoList userId={userProfile.id} id={id}/>
        </div>
    )
}

export default Todos;