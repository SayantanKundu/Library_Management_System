import React from 'react';
import './requestcard.css';
import axios from 'axios';

const RequestCard = (props) => {
    let { requestInfo } = props;

    const handleIssueClick = () => {
        axios.post('http://localhost:4001/api/admin/issuebook',
            {
                issueId: requestInfo._id,
                userName: requestInfo.userName,
                bookId: requestInfo.bookDetails.bookId,
                bookName: requestInfo.bookDetails.bookName,
            })
            .then(response => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    return (
        <div>
            <div className="card-style">
                <h4>{requestInfo.userName}</h4>
                <span className="text-style">requested for</span>
                <h3>{requestInfo.bookDetails.bookName}</h3>

                <button
                    type="button"
                    className="issue-btn"
                    onClick={handleIssueClick}>
                    Issue
            </button>
            </div>
        </div>
    )
}

export default RequestCard
