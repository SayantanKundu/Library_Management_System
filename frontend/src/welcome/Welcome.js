import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './welcome.css';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
    const auth = useContext(AuthContext);
    return (
        <div className="nav-links">
            {auth.isAdmin && < NavLink to="/addbook" exact>Add a book</NavLink>}
            <NavLink to="/viewbooks" exact>Show all books</NavLink>
            <NavLink to="/bookrequest" exact>Book Requests</NavLink>
        </div >
    )
}

export default Welcome
