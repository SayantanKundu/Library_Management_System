import React, { useContext } from 'react'
import './bookcard.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookCard = (props) => {
    let { bookInfo } = props;

    const auth = useContext(AuthContext);

    let userName = auth.userName;

    if (userName === "") {
        userName = localStorage.getItem("userName");
    }

    const handleBookDelete = () => {
        axios.delete('http://localhost:4001/api/admin/deletebook',
            {
                params: {
                    id: bookInfo._id
                }
            })
            .then(response => {
                alert(response.data.message);
            }).catch(err => {
                alert(err.response.data.message);
            })
    }

    const handleIssueClick = () => {
        axios.post('http://localhost:4001/api/user/issuebookrequest',
            {
                id: bookInfo._id,
                bookName: bookInfo.name,
                userName: userName
            })
            .then(response => {
                alert(response.data.message);
                window.reload();
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    return (
        <div className="card-style">
            <h1>{bookInfo.name}</h1>
            <span className="text-style">by</span>
            <h3>{bookInfo.author}</h3>

            {!bookInfo.available && <span className="text-style" style={{ justifyContent: 'center' }}>Unavailable</span>}
            <button
                type="button"
                className="issue-btn"
                disabled={bookInfo.available ? false : true}
                onClick={handleIssueClick}>
                Request Book
                </button>
            {auth.isAdmin && <button type="button" onClick={handleBookDelete}>Delete</button>}
        </div>
    )
}

export default BookCard
