import React, { useEffect,useState } from 'react';
import './returnbook.css';
import ReturnBookCard from './ReturnBookCard';
import axios from 'axios';

const ReturnBook = () => {
    const [booklist, setBooklist] = useState([]);
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        axios.get('http://localhost:4001/api/user/issuedbooks',
            {
                params: {
                    userName: userName
                }
            })
            .then(response => {
                setBooklist(response.data.result);
            })
    }, [])

    return (
        <div className="book-container">
            {booklist.map(book => {
                return (<React.Fragment>
                    <ReturnBookCard key={book._id} bookInfo={book} userName={userName}></ReturnBookCard>
                </React.Fragment>)
            })
            }
        </div>
    )
}

export default ReturnBook
