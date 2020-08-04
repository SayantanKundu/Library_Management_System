import React, { useState } from 'react';
import axios from 'axios';
import './addbook.css';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const submitBook = () => {
        axios.post('http://localhost:4001/api/admin/addbook', {
            name: name,
            author: author
        }).then(response => {
            alert(response.data.message);
            window.location.reload();
        }).catch(err => {
            alert(err.response.data.message);
        })
    }

    const handleNameInput = (event) => {
        setName(event.target.value);
    }

    const handleAuthorInput = (event) => {
        setAuthor(event.target.value);
    }

    return (
        <div class="main-container">
            <form>
                <h2>Add book</h2>
                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onKeyUp={handleNameInput}></input>
                </p>
                <p>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" onKeyUp={handleAuthorInput}></input>
                </p>
                <button type="button" onClick={submitBook}>Add</button>
            </form>
        </div>
    )
}

export default AddBook
