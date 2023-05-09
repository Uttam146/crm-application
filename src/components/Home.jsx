import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Home(props){
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  useEffect(()=>{
      if(token == undefined || token == '' || localStorage.getItem('token') == undefined){
        navigate('/login');    
      }else{
        navigate('/home');    
      }
  },[])
    return(
        <h1>Home</h1>
    )
}

export default Home;
