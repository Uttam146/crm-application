import React from "react";
import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crm-backend-iukg.onrender.com'

export async function forgotpassword(data){ 
    return axios.post(`${BASE_URL}/crm/api/v1/forgotpassword`,data);
}

export async function resetpassword(data){ 
    return axios.post(`${BASE_URL}/crm/api/v1/resetpassword`,{password:data.password},{
        headers: {
            "x-access-token": data.token
          },
    });
}