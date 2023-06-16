import React, { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { fetchAllTicketStatus } from '../api/ticketApi';


const useTicketChart = () => {
    const localStorage = useLocalStorage();
    const [ticketChart, setTicketChart] = useState([]);

    useEffect(() => {
        if (localStorage.accessToken) {
            fetchAllTicketStatus(localStorage.accessToken)
                .then((res) => setTicketChart(res.data))
                .catch((err) => console.log(err))
        } else {
            setTicketChart(
                ["Tickets", "Tickets Data"],
                ["Proposed", 0],
                ["Active", 0],
                ["Resolved", 0],
                ["Closed", 0])
        }
    }, [])

    return ticketChart;
}

export default useTicketChart;
