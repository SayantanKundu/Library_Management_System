import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './viewbooks.css';

const ViewBooks = () => {
    const [booklist, setBooklist] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4001/api/user/books')
            .then(response => {
                setBooklist(response.data.result);
            })
    }, [])

    return (
        <div className="book-container">
            {booklist.map(book => {
                return (<React.Fragment>
                    <BookCard key={book._id} bookInfo={book}></BookCard>
                </React.Fragment>)
            })
            }
        </div>
    )
}

export default ViewBooks
