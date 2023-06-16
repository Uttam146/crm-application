import React from "react";
import axios from "axios";


//const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crm-backend-iukg.onrender.com';



export async function SignUpForm(data) {
    console.log(BASE_URL);
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function SignInForm(data) {
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}   

export async function SignInFormV2(data) {
    return axios.post(`${BASE_URL}/crm/api/v1/auth/newsignup`, data);
}   