import React, { useState } from 'react';

import FormInput from '../../components/FormInput/FormInput';
import Button from '@material-ui/core/Button';

// scss
import './Register.scss';
import { Redirect } from 'react-router-dom';

const Register = props => {
    const [newUserCredentials, setNewUserCredentials] = useState({
        password: '',
        name: '',
        surname: '',
    });

    const { password, name, surname } = newUserCredentials;

    const handleSubmit = event => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                name,
                surname,
            }),
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    console.log(e);
                    //return <Redirect to="/" />;
                } else {
                    console.log(e);
                }
            })
    };

    const handleChange = event => {
        const { value, name } = event.target;

        setNewUserCredentials({ ...newUserCredentials, [name]: value });
    };

    return (
        <div className="signup__page">
            <h2>Register</h2>

            <form onSubmit={handleSubmit} className="signup__form">
                <FormInput name="name" type="name" value={name} handleChange={handleChange} label="Name" required />
                <FormInput name="surname" type="surname" value={surname} handleChange={handleChange} label="Surname" required />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <div className="form-buttons">
                <Button type="submit"> Register </Button>
                </div>
            </form>
        </div>
    );
};
export default Register;
