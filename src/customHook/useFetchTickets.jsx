import React, { useState, useEffect } from "react";
import { fetchAllTicket } from "../api/ticketApi";
import useLocalStorage from "./useLocalStorage";

const useFetchTickets = () => {

    const [ticketDetails, setTicketDetails] = useState([]);
    const localStorage = useLocalStorage();

    useEffect(() => { fetchTickets(); }, []);

    const fetchTickets = () => {
        fetchAllTicket({ token: localStorage.accessToken })
            .then(res => {
                setTicketDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return [ticketDetails, setTicketDetails, fetchTickets];
};

export default useFetchTickets;









