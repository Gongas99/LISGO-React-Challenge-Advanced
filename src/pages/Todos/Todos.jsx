import React, { useState } from 'react';

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'

import { useAuth } from '../../providers/';

const Todos = () => {
    const { userProfile } = useAuth();

    return (
        <div className="todos">
            <TodoForm />
            <br/>
            <TodoList userId={userProfile.id}/>
        </div>
    )
}

export default Todos;