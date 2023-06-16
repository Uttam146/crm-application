import React, { useState,useEffect } from "react";
import { fetchAllUsers } from "../api/usersApi";

const useUser = () => {
    const [getUsers, setGetUsers] = useState([]);
    useEffect(() => {
      fetchAllUsers()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);
  
    return [getUsers,setGetUsers];
  };

  export default useUser;