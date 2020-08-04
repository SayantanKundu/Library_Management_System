import React, { useEffect, useState, useContext } from 'react';
import './returnbook.css';
import ReturnBookCard from './ReturnBookCard';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ReturnBook = () => {
    const [booklist, setBooklist] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:4001/api/user/issuedbooks',
            {
                params: {
                    userName: auth.userName
                }
            })
            .then(response => {
                setBooklist(response.data.result);
            })
    }, [])

    return (
        <div>
            <h1>Return issued books</h1>
            <div className="book-container">
                {booklist.map(book => {
                    return (<React.Fragment>
                        <ReturnBookCard key={book._id} bookInfo={book} userName={auth.userName}></ReturnBookCard>
                    </React.Fragment>)
                })
                }
            </div>
        </div>
    )
}

export default ReturnBook
