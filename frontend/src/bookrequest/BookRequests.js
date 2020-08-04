import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestCard from './RequestCard';
import './bookrequest.css';

const BookRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/api/admin/bookrequest')
            .then(response => {
                setRequests(response.data.result);
            })
            .catch(err => {
                setRequests([]);
            })

    }, [])

    return (
        <div>
            <h1>Book Requests</h1>
            <div>
                {requests.map(req => {
                    return (<React.Fragment>
                        <RequestCard key={req._id} requestInfo={req}></RequestCard>
                    </React.Fragment>)
                })
                }
            </div>
        </div>
    )
}

export default BookRequests
