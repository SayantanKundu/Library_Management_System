import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom'
import './homepage.css';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const HomePage = (props) => {
    const [role, setRole] = useState('user');
    const [userField, setUserField] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext);

    const handleRoleChange = () => {
        let userRole = document.getElementById('role').value;
        setRole(userRole);
    }

    const handleEmailChange = (event) => {
        setUserField(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    

    const loginClick = () => {
        let userRole = document.getElementById('role').value;
        axios.get('http://localhost:4001/api/user/login',
            {
                params: {
                    userField: userField,
                    password: password,
                    role: role
                }
            }).then(response => {
                auth.login(userRole, userField);
                props.history.push('/welcome');
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            })

    }
    return (
        <div className="main-container">
            <form>
                <p>
                    <label htmlFor="role">Choose a role:</label>
                    <select id="role" name="role" onChange={handleRoleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </p>

                <p>
                    <label htmlFor="email">Username: </label>
                    <input type="text" id="email" onKeyUp={handleEmailChange}></input>
                </p>

                {role === 'admin' ? <React.Fragment>
                    <p>
                        <label htmlFor="email">Password: </label>
                        <input type="password" onKeyUp={handlePasswordChange}></input>
                    </p>
                </React.Fragment> : <br />
                }

                <p>
                    <button type="button" onClick={loginClick}>Login</button>
                    <div style={{ paddingTop: '20px' }}>
                        <span>Not registered yet?</span>
                        <NavLink style={{ paddingLeft: '20px' }} to="/register">Register Here</NavLink>
                    </div>
                </p>
            </form>

            <br />


        </div>
    )
}

export default withRouter(HomePage)

