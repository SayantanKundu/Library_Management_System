import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const submitBook = () => {
        axios.post('http://localhost:4001/api/admin/addbook', {
            name: name,
            author: author
        }).then(response => {
            alert(response.data.message);
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
        <div>
            <form>
                <h2>Add book</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onKeyUp={handleNameInput}></input>
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" onKeyUp={handleAuthorInput}></input>
                <button type="button" onClick={submitBook}>Add</button>
            </form>
        </div>
    )
}

export default AddBook
