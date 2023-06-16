import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useLocation,useParams } from "react-router-dom";

function Auth(props) {
    const location = useLocation();
    const loginDetails = useSelector(state => state.login);
    const path = location.pathname.split("/")[1];

    if (loginDetails.userType == '' || loginDetails.accessToken == '' || loginDetails.userStatus == 'BLOCKED') {
        if (path == '') return <Navigate to='/' />
        else return  <Navigate to='/login' />
    } else {
        if (path == '' || path == '/login') return <Navigate to='/home' />
        else return <>{props.children}</>
    }
}

export default Auth;