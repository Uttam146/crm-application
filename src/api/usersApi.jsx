import React from "react";
import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crm-backend-iukg.onrender.com'

export async function fetchAllUsers(userType){
    return axios.get(`${BASE_URL}/crm/api/v1/getusers/${userType}`);
}

export async function deleteUserById(data){
    return axios.post(`${BASE_URL}/crm/api/v1/deleteusers`,data);
}

export async function editUserById(data){
    return axios.post(`${BASE_URL}/crm/api/v1/updateusers`,data);
}
