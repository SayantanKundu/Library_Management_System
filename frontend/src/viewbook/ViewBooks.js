import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './viewbooks.css';

const ViewBooks = () => {
    const [booklist, setBooklist] = useState([]);
    useEffect(() => {

        //using REST

        // axios.get('http://localhost:4001/api/user/books')
        //     .then(response => {
        //         setBooklist(response.data.result);
        //     })


        //using graphql
        axios.post('http://localhost:4001/graphql',
            {
                query: `{
                    getBookData{bookDetails{name author available}}
                }`
            }
        )
            .then(response => {
                setBooklist(response.data.data.getBookData.bookDetails);
            })


    }, [])

    return (
        <div>
            <h1>Book Repository</h1>

            <div className="book-container">
                {booklist.map(book => {
                    return (<React.Fragment>
                        <BookCard key={book._id} bookInfo={book}></BookCard>
                    </React.Fragment>)
                })
                }
            </div>
        </div>
    )
}

export default ViewBooks
