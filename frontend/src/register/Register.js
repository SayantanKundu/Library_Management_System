import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './register.css';
import axios from 'axios';

const Register = (props) => {
    const [role, setRole] = useState('user');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');

    const handleRoleChange = () => {
        let userRole = document.getElementById('role').value;
        setRole(userRole);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleContactChange = (event) => {
        setContactNo(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRegisterClick = () => {
        axios.post('http://localhost:4001/api/user/adduser',
            {
                role: role,
                name: name,
                email: email,
                contactNo: contactNo,
                password: password
            })
            .then(response => {
                alert('Registered Successfully !!! \nYour userName is ' + response.data.userName +
                    "\nPlease keep this for future reference");

                setTimeout(() => {
                    props.history.push('/home');
                }, 1000);
            }).catch(err => {
                alert(err.response.data.message);
            })
    }

    return (
        <div className="main-container">
            <form>
                <p>
                    <label htmlFor="role">Select Role: </label>
                    <select id="role" name="role" onChange={handleRoleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onKeyUp={handleNameChange}></input>
                </p>
                <p>
                    <label htmlFor="name">Email: </label>
                    <input type="text" id="label" onKeyUp={handleEmailChange}></input>
                </p>
                <p>
                    <label htmlFor="name">Contact Number: </label>
                    <input type="text" id="label" onKeyUp={handleContactChange}></input>
                </p>

                {role === 'admin' ? <React.Fragment>
                    <p>
                        <label htmlFor="email">Password:</label>
                        <input type="password" onKeyUp={handlePasswordChange}></input>
                    </p>
                </React.Fragment> : <br />
                }

                <button type="button" onClick={handleRegisterClick}>Register</button>
            </form>
        </div>
    )
}

export default withRouter(Register)
