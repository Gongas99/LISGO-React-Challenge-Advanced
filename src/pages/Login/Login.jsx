import React, { useState } from 'react';
import { useAuth } from '../../providers/';
import { Redirect } from "react-router-dom";

import FormInput from '../../components/FormInput'
import Button from '@material-ui/core/Button';

import './Login.scss';

const Login = () => {
    const [userCredentials, setCredentials] = useState({
        name: '',
        password: '',
    });
    const { name, password } = userCredentials;
    
    const { signIn } = useAuth();

    const handleSubmit = event => {
        event.preventDefault();
        signIn(name, password, function(message) {
            //if success
            if(message){
                return <Redirect to="/todos" />
            }
            //TODO error
        });
    };

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <span>Use your name and password</span>

            <form onSubmit={handleSubmit} className="login-form">
                <FormInput
                    name="name"
                    type="name"
                    value={name}
                    handleChange={handleChange}
                    label="Insert Name"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Insert Password"
                    required
                />

                <div>
                    <Button type="submit"> Login </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
