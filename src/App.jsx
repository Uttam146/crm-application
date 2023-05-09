import React from "react";
import { useState } from "react";
import SignUp from './components/SignUp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
// import Home from './components/Home';
import Engineer from './components/Engineer';
import Customer from './components/Customer';
import Admin from './components/Admin';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Engineer" element={<Engineer />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* <Route path="/customer" element={<Customer/>} />
          <Route path='/engineer' element={<Engineer/>} />
          <Route path='/admin' element={<Admin/>} /> */}

        </Routes>
      </Router>
    </>
  )
}

export default App
