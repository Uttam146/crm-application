import React from "react";
import { useState } from "react";
import SignUp from './components/SignUp/SignUp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/Login/LogIn';
import SideNav from './components/SideNav';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendars from "./components/Calendar";
import Ticket from "./components/Ticket";
import Users from "./components/Users";
import TicketHistory from './components/TicketHistory';
// import { Home } from "@mui/icons-material";

function App() {
    return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/Ticket" element={<Ticket/>} />
          <Route path="/Calendar" element={<Calendars/>} />
          <Route path="/Users" element={<Users/>} />          
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<TicketHistory/>} />          

        </Routes>
      </Router>
    </>
  )
}

export default App


