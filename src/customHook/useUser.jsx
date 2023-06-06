import { fetchAllUsers } from "../api/fetchUsers";
import { useState,useEffect } from "react";
const useUser = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      fetchAllUsers()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);
  
    return [userData];
  };

  export default useUser;