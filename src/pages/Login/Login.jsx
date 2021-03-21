import React, { useState } from 'react';
import { useAuth } from '../../providers/';
import { useHistory } from 'react-router-dom'


import FormInput from '../../components/FormInput'
import Button from '@material-ui/core/Button';

import './Login.scss';

const Login = () => {
    const [userCredentials, setCredentials] = useState({
        name: '',
        password: '',
    });
    const { name, password } = userCredentials;
    const history = useHistory();

    const { signIn } = useAuth();

    const handleSubmit = event => {
        event.preventDefault();
        signIn(name, password, function (message) {
            //if success
            if (message) {
                history.push(`/todos/`)
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
            <div className="login-title">
                <h2>Login</h2>
                <span>Use your name and password</span>
            </div>

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

                <div className="form-button">
                    <Button type="submit"> Login </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
