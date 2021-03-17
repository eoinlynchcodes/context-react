import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login(){

    const history = useHistory();

    const [ loginData, setLoginData ] = useState({
        emailaddress: "",
        password: ""
    });

    const handleChange = (event) => {
        setLoginData({
        ...loginData,
        [event.target.name]: event.target.value,
        });
    };

    // Function to Login
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/api/users/login`, loginData)
        .then(response => {
            setLoginData(response.data);
            localStorage.setItem('userID', response.data.userID);
            history.push('/dashboard');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <form onSubmit={event => handleSubmit(event)} className="login-form"> 
            <h2>Log In</h2>
                <label>Company Code:</label>
                    <input 
                    name="companycode"
                    type="text"
                    onChange={(event) => handleChange(event)}
                    />
                <br/>
                <label>Email Address:</label>
                    <input 
                    name="emailaddress"
                    type="text"
                    onChange={(event) => handleChange(event)}
                    />
                <br/>
                <label>Password:</label>
                    <input 
                    name="password"
                    type="password"
                    onChange={(event) => handleChange(event)}
                    />
                <br/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    );
}

export default Login;