import React from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchAllUsers(){
    return axios.get(`${BASE_URL}/crm/api/v1/getusers`);
}

export async function deleteUserById(data){
    return axios.post(`${BASE_URL}/crm/api/v1/deleteusers`,data);
}

export async function editUserById(data){
    return axios.post(`${BASE_URL}/crm/api/v1/updateusers`,data);
}
