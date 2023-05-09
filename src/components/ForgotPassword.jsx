import React from "react";
import { useState } from "react";
import { ForgotPasword } from '../schemas/ForgotPassword';
import { FaUserAlt } from "react-icons/all.js";
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.setErrors('sdsd');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  
function ForgotPassword(){
    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          userId: '',
          userName: '',
          emailId: "",
          password: "",
        },
        validationSchema: ForgotPasword,
        onSubmit,
      });
 return(
    <div className="bg-info d-flex justify-content-center align-items-center vh-100 myc">
    <div style={{ width: '30rem' }} className="card p-3 rounded-4 shadow-lg">
      <h4 style={{ textAlign: 'center' }}>Forgot Password</h4>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input className='form-control my-3  mx-1' type='text' name='emailId' value={values.emailId} onChange={(e) => handleChange(e)} placeholder="Enter the EmailId" />
          {errors.emailId && touched.emailId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '9.5vh', color: 'red' }} className="error">{errors.emailId}</p>}
        </div>

        
        <div className="d-grid gap-2 my-3">
          <Button variant="primary" size="md" type='submit'>
           Send Email
          </Button>
        </div>

      </form>
      {/* <div className="text-info text-center m-1" onClick={() => navigate('/SignUp')}>
        Already have an account ? Login Up
      </div> */}
    </div>
  </div>
 )
}


export default ForgotPassword;