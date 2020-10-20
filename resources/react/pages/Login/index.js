import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
//import { } from './style';

import { Context as UserContext } from '../../contexts/UserContext';

import { UserForm } from '../../components/Forms';
import { UserFormInput, UserFormSubmit } from '../../components/FormInputs';


const Login = () => {
    const { loading, error, isAuth, login } = useContext(UserContext);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        login(formData);
    }

    if(loading) return 'Loading...';
    if(error)   return error;
    return (<>
        {isAuth && <Redirect to="/" />}
        
        <div className="Login">
            <h1>Login form</h1>
            <UserForm onSubmit={onSubmit}>
                <label for="name">Name:</label>
                <UserFormInput type="email" name="email" placeholder="Email" onChange={onChange} />
                <label for="name">Name:</label>
                <UserFormInput type="password" name="password" placeholder="Password" onChange={onChange} />
                <UserFormSubmit value="Save" />
            </UserForm>
        </div>
    </>);
}

export default Login;