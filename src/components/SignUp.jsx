import React from "react";
import { useState,useEffect } from "react";
import { FaUserAlt } from "react-icons/all.js";
import Dropdown from 'react-bootstrap/Dropdown';
import { SignUpschema } from '../schemas/SignUpSchema';
import {SignUpForm} from '../api/userAuth';
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [role, setRole] = useState('Select Role');
  const [alert, setAlert] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
      const data = {
        name:values.userName,
        userId:values.userId,
        email:values.emailId,
        userType:role,
        password:values.password
    };
    
    SignUpForm(data)
    .then((res)=>{
      console.log(res);
      navigate('/login');
    })
    .catch((err)=>{
      console.log(err);
      setAlert(true);
      setAlertMessage(err.response.data.message);  
    })
    setAlert(true);
    //actions.resetForm();
  };
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
    validationSchema: SignUpschema,
    onSubmit,
  });
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
  
    if (!token || !userType) {
      return;
    }
  
  
    if (userType === "ENGINEER") {
      window.location.href = "/engineer";
    }
    else if (userType === "CUSTOMER") {
      window.location.href = "/customer";
    } else {
      window.location.href = "/admin";
  
    }
  
  })

  return (

    <div className="bg-info d-flex flex-column justify-content-center align-items-center vh-100">
      <div style={{marginTop:'-15vh'}} className="d-flex justify-content-center align-items-center" >
        {
          alert &&
        <Alert  variant="danger" onClose={() => setAlert(false)} dismissible>
      <p>
        {alertMessage}
      </p>
      
    </Alert>
    }
    </div>
      <div style={{ width: '30rem',marginTop:'10vh' }} className="card p-3 rounded-4 shadow-lg">
        <h4 style={{ textAlign: 'center' }}>Sign Up</h4>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='userId' value={values.userId} onChange={handleChange} placeholder="Enter the UserId" />
            {errors.userId && touched.userId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '6vh', color: 'red' }} className="error">{errors.userId}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='userName' value={values.userName} onChange={(e) => handleChange(e)} placeholder="Enter the UserName" />
            {errors.userName && touched.userName && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '6vh', color: 'red' }} className="error">{errors.userName}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='emailId' value={values.emailId} onChange={(e) => handleChange(e)} placeholder="Enter the EmailId" />
            {errors.emailId && touched.emailId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '6vh', color: 'red' }} className="error">{errors.emailId}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='password' name='password' value={values.password} onChange={(e) => handleChange(e)} placeholder="Enter the Password" />
            {errors.password && touched.password && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '6vh', color: 'red' }} className="error">{errors.password}</p>}
          </div>

          <Dropdown>
            <Dropdown.Toggle className='text-white mt-3 mb-4 mx-1 d-inline-block w-100' variant="info">
              {role}
            </Dropdown.Toggle>

            <Dropdown.Menu className='w-100'>
              <Dropdown.Item eventKey="1" disabled>Select the Below User Role</Dropdown.Item>
              <Dropdown.Item eventKey="2" name='ENGINEER' onClick={(e) => setRole(e.target.name)}>Enginner <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
              <Dropdown.Item eventKey="3" name='ADMIN' onClick={(e) => setRole(e.target.name)}>Admin <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
              <Dropdown.Item eventKey="4" name='CUSTOMER' onClick={(e) => setRole(e.target.name)}>Support <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="d-grid gap-2">
            <Button variant="primary" size="md" type='submit'>
             Sign Up
            </Button>
          </div>

        </form>
        <div className="text-info text-center m-1" onClick={() => navigate('/login')}>
          Already have an account ? Login Up
        </div>
      </div>
    </div>
  )
}

export default SignUp;