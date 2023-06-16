import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";
import { forgotpassword, resetpassword } from "../api/forgotPasswordApi";
import { SwalAuth } from "./Swal/SwalAuth";



function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotDetails, setForgotDetails] = useState({ emailId: '', password: '' });
  const data = useLocation().search.split('?')[1];
  const handleChange = (e) => {
    setForgotDetails({ ...forgotDetails, [e.target.name]: e.target.value });
  }
  const submitEmail = () => {
    event.preventDefault();
    forgotpassword({ email: forgotDetails.emailId })
      .then((res) => {
        if (res.data.message == 'Email Send to your emailId') {
          SwalAuth('success', res.data.message, 4000, 'top-end');
        } else {
          SwalAuth('warning', res.data.message, 4000, 'top-end');
        }
      })
      .catch((err) => console.log(err));
  }
  const submitPassword = () => {
    event.preventDefault();
    resetpassword({ token: data, password: forgotDetails.password })
      .then((res) => navigate('/login'))
      .catch((err) => {
        console.log(err);
        SwalAuth('warning', err.data.message, 4000, 'top-end');
      })
  };

  return (
    <div className="bg-info d-flex justify-content-center align-items-center vh-100 myc">
      <div style={{ width: '30rem' }} className="card p-3 rounded-4 shadow-lg">
        {
          data ?
            <>
              <h4 style={{ textAlign: 'center' }}>Reset Password</h4>
              <form onSubmit={submitPassword}>
                <div className="input-group">
                  <input className='form-control my-3  mx-1' type='text' name='password' value={forgotDetails.password} onChange={(e) => handleChange(e)} placeholder="Password" />
                </div>

                <div className="d-grid gap-2 my-3">
                  <Button variant="primary" size="md" type='submit'>
                    Reset Password
                  </Button>
                </div>
              </form>
            </>
            :
            <>
              <h4 style={{ textAlign: 'center' }}>Forgot Password</h4>
              <form onSubmit={submitEmail}>

                <div className="input-group">
                  <input className='form-control my-3  mx-1' type='text' name='emailId' value={forgotDetails.emailId} onChange={(e) => handleChange(e)} placeholder="EmailId" />
                </div>
                <div className="d-grid gap-2 my-3">
                  <Button variant="primary" size="md" type='submit'>
                    Send Email
                  </Button>
                </div>
              </form>
            </>
        }
      </div>
    </div>
  )
}


export default ForgotPassword;