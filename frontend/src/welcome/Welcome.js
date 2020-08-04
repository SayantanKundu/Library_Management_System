import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './welcome.css';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
    const auth = useContext(AuthContext);

    const handleLogoutClick=()=>{
        auth.logout();
    };

    return (
        <div className="nav-links">

            <h1>Welcome to the Library {auth.userName}</h1>
            <ul>
                {auth.isAdmin &&
                    <li>
                        <NavLink to="/addbook" exact>Add a book</NavLink>
                    </li>
                }
                <li>
                    <NavLink to="/viewbooks" exact>Show all books</NavLink>
                </li>
                {
                    auth.isAdmin &&
                    <li>
                        <NavLink to="/bookrequest" exact>Book Requests</NavLink>
                    </li>
                }
                {
                    !auth.isAdmin &&
                    <li>
                        <NavLink to="/returnbook" exact>Return Book</NavLink>
                    </li>
                }
            </ul>
            <NavLink to="/home" className="logout-btn" onClick={handleLogoutClick}>Logout</NavLink>
        </div >
    )
}

export default Welcome
