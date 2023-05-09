import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function SignUpForm(data){
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signup`,data);
}   

export async function SignInForm(data){
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signin`,data);
}   