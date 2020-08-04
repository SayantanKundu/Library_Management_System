import React from 'react';
import axios from 'axios';


const ReturnBookCard = (props) => {
    let { bookInfo,userName } = props;

    const handleReturnClick = () => {
        axios.put('http://localhost:4001/api/user/returnbook',
        {
            userName: userName,
            bookId: bookInfo.bookId,
            bookName: bookInfo.bookName
        })
        .then(response=>{
            alert(response.data.message);
        })
        .catch(err=>{
            alert(err.response.data.message);
        })
    }

    return (
        <div className="card-style">
            <h1>{bookInfo.bookName}</h1>

            <button
                type="button"
                className="issue-btn"
                onClick={handleReturnClick}>
                Return Book
            </button>
        </div>
    )
}

export default ReturnBookCard
