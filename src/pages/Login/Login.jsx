import React, { useState } from 'react';
import { useAuth } from '../../providers/';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

import FormInput from '../../components/FormInput'
import Button from '@material-ui/core/Button';

import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = () => {
    const [userCredentials, setCredentials] = useState({
        name: '',
        password: '',
    });
    const { name, password } = userCredentials;
    const history = useHistory();

    const { signIn } = useAuth();

    //configure toast for this page
    toast.configure();

    const handleSubmit = async event => {
        event.preventDefault();
        const response = await signIn(name, password);
        if (response) {
            toast.success('Login Success');
            history.push(`/todos/`)
        }
        else{
            toast.error('Invalid Login Credentials');
        }
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
