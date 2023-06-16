import React, { useState } from "react";
import { FaUserAlt } from "react-icons/all.js";
import { useSelector } from 'react-redux';
import { SignUpschema } from '../../schemas/SignUpSchema';
import { SignUpForm } from '../../api/userAuth';
import { useFormik } from "formik";
import { Dropdown, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from "react-router-dom";
import { SwalAuth } from '../Swal/SwalAuth';
import { userStatus } from "../../constants/constant";
import './SignUp.css';

function SignUp() {

  const navigate = useNavigate();
  const loginDetails = useSelector(state => state.login);
  const [role, setRole] = useState('SELECT ROLE');

  const onSubmit = async (values, actions) => {
    const data = {
      name: values.userName,
      userId: values.userId,
      email: values.emailId,
      userType: role,
      password: values.password
    };

    SignUpForm(data)
      .then((res) => {
        SwalAuth('success', 'SignUp Successfull', 1000, 'top-end');
        navigate('/login');
      })
      .catch((err) => {
        SwalAuth('error', err.response.data.message, 4000, 'top-end');
      })
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: '',
      userName: '',
      emailId: "",
      password: "",
    },
    validationSchema: SignUpschema,
    onSubmit,
  });

  if (loginDetails.userType != '' && loginDetails.accessToken != '' && loginDetails.userStatus != userStatus.BLOCKED) {
    return <Navigate to='/home' />
  }

  return (
    <div id='SignUpComponent' className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div style={{ width: '30rem', marginTop: '6vh' }} id='cardcontainer' className="card p-3 rounded-4 shadow-lg">
        <h3 style={{ textAlign: 'center', color: 'white' }}>Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='userId' value={values.userId} onChange={handleChange} placeholder="UserID" />
            {errors.userId && touched.userId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.userId}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='userName' value={values.userName} onChange={(e) => handleChange(e)} placeholder="UserName" />
            {errors.userName && touched.userName && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.userName}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='emailId' value={values.emailId} onChange={(e) => handleChange(e)} placeholder="EmailID" />
            {errors.emailId && touched.emailId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.emailId}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' aria-describedby="basic-addon2" type='password' name='password' value={values.password} onChange={(e) => handleChange(e)} placeholder="Password" />
            {errors.password && touched.password && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.password}</p>}
          </div>

          <Dropdown>
            <Dropdown.Toggle className='text-white mt-3 mb-4 mx-1 d-inline-block w-100' variant="info">
              {role}
            </Dropdown.Toggle>

            <Dropdown.Menu className='w-100'>
              <Dropdown.Item eventKey="1" disabled>Select the Below User Role</Dropdown.Item>
              <Dropdown.Item eventKey="2" name='ENGINEER' onClick={(e) => setRole(e.target.name)}>ENGINEER <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
              <Dropdown.Item eventKey="3" name='ADMIN' onClick={(e) => setRole(e.target.name)}>ADMIN <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
              <Dropdown.Item eventKey="4" name='CUSTOMER' onClick={(e) => setRole(e.target.name)}>CUSTOMER <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
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