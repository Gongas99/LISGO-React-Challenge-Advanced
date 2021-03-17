import React, { useState } from 'react';
import { useAuth } from '../../providers';
import { Link } from 'react-router-dom';

import FormInput from '../../components/FormInput'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import './Login.scss';

/**
 * Material UI function to use styles
 */
 const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Login = () => {
    const [userCredentials, setCredentials] = useState({
        user: '',
        password: '',
    });
    const { user, password } = userCredentials;

    const { signIn } = useAuth();

    const handleSubmit = event => {
        event.preventDefault();

        signIn(user, password, function(message) {
            //notifyError(message, null);
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
                    value={user}
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

                <div className="form-buttons">
                    <Button type="submit"> Login </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
