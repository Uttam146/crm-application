import React from "react";
import SignUp from './components/SignUp/SignUp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/Login/LogIn';
import Home from './components/DashBoard/Home';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendars from "./components/Calendar/Calendar";
import Ticket from "./components/Tickets/Ticket";
import Users from "./components/Users/Users";
import TicketHistory from './components/Tickets/TicketHistory';
import PageNotFound from "./components/PageNotFound";
import Auth from './HOC/Auth';

function App() {
  return (
    <>
      <Router>
        <Routes>
        {/* <Route path="/login/:token?" element={<LogIn />} /> */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword:token" element={<ForgotPassword />} />
          <Route path="/Ticket" element={<Auth><Ticket /></Auth>} />
          <Route path="/Calendar" element={<Auth><Calendars /></Auth>} />
          <Route path="/Users" element={<Auth><Users /></Auth>} />
          <Route path="/home" element={<Auth><Home /></Auth>} />
          <Route path="/login:token" element={<LogIn />} />
          <Route path="/history" element={<Auth><TicketHistory /></Auth>} />
          <Route path="*" element={<PageNotFound />} />


        </Routes>
      </Router>
    </>
  )
}

export default App


