import React, { useState } from 'react';

import FormInput from '../../components/FormInput/FormInput';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

// scss
import './Register.scss';
import { Redirect } from 'react-router-dom';

const Register = props => {
    const [newUserCredentials, setNewUserCredentials] = useState({
        password: '',
        name: '',
        surname: '',
        roleId: 1 //normal user
    });

    const { password, name, surname } = newUserCredentials;

    const [checked, setChecked] = useState(false);

    const handleRoleChange = event => {
        setChecked(event.target.checked);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                name,
                surname,
                roleId: checked ? 2 : 1,
            }),
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
            .then(response => response.json())
            .then(function (e) {
                if (e.success) {
                    return <Redirect to="/" />;
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
        <div className="register">
            <div className="register-title">
                <h2>Register</h2>
                <span>Here you can register a new user!</span>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
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
                <div className="form-type">
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleRoleChange} />}
                        label="Admin"
                    />
                </div>
                <div className="form-button">
                    <Button type="submit"> Register </Button>
                </div>
            </form>
        </div>
    );
};
export default Register;
