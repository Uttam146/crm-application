import React from "react";
import axios from "axios";

//const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crm-backend-iukg.onrender.com'

export async function fetchAllTicket(data) {
    return axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
            "x-access-token": data.token
        },
    });
}

export async function saveTicket(data) {
    return axios.post(`${BASE_URL}/crm/api/v1/tickets`, data);
}

export async function editTicketyId(data, token) {
    console.log(token);
    return axios.put(`${BASE_URL}/crm/api/v1/updateticket`, data, {
        headers: {
            "x-access-token": token
        },
    });
}

export async function fetchAllTicketStatus(token) {
    return axios.get(`${BASE_URL}/crm/api/v1/allTicketStatus`, {
        headers: {
            "x-access-token": token
        },
    });
}

export async function deleteTicket(id,token) {
    return axios.delete(`${BASE_URL}/crm/api/v1/deleteTicket/${id}`, {
        headers: {
            "x-access-token": token
        },
    });
}