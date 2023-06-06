import React from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchAllTicket(){
    return axios.get(`${BASE_URL}/crm/api/v1/alltickets`);
}

export async function saveTicket(data){
    return axios.post(`${BASE_URL}/crm/api/v1/alltickets`,data);
}

export async function editTicketyId(data){
    return axios.post(`${BASE_URL}/crm/api/v1/updateticket`,data);
}
