import React, { useState } from 'react';
import { useSelector } from 'react-redux';

 const useLocalStorage = () => {
    const [localStorage,setLocalStorage] = useState(useSelector(state => state.login));
    return localStorage;
}

export default useLocalStorage;
