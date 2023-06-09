import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveLogin } from '../../store/slices/loginSlice';
import { LogInschema } from '../../schemas/LogInSchema';
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import { useNavigate, Navigate,useLocation } from "react-router-dom";
import { SignInForm } from "../../api/userAuth";
import { SwalAuth } from "../Swal/SwalAuth";
import axios from "axios";
import './LogIn.css';

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useLocation().search.split('?')[1];
  const loginDetails = useSelector(state => state.login);

  const onSubmit = async (values, actions) => {
    const data = {
      email: values.emailId,
      password: values.password
    };
    SignInForm(data)
      .then((res) => {
        dispatch(saveLogin(res.data));
        SwalAuth('success', 'Log In Sucessfull', 2000, 'bottom-end');
        navigate('/home');
      })
      .catch((err) => {
        SwalAuth('error', err.response.data.message, 3000, 'top-end');
      })
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: LogInschema,
    onSubmit,
  });

  useEffect(()=>{
    if(data){
        axios.post(`https://crm-backend-iukg.onrender.com/crm/api/v1/auth/${data}`)
        .then((res)=> dispatch(saveLogin(res.data)))
        .catch((err)=> console.log(err));
      }
  },[])

  if (loginDetails.userType != '' && loginDetails.accessToken != '' && loginDetails.userStatus != 'BLOCKED') {
    return <Navigate to='/home' />
  }

  return (
    <div id='LoginComponent' className="d-flex  flex-column justify-content-center align-items-center vh-100 ">
      <div style={{ width: '30rem', marginTop: '4vh' }} id='cardcontainer' className="card p-3 rounded-4 shadow-lg">
        <h4 style={{ textAlign: 'center', color: 'white' }}>Log In</h4>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input className='form-control my-3  mx-1' type='text' name='emailId' value={values.emailId} onChange={(e) => handleChange(e)} placeholder="EmailId" />
            {errors.emailId && touched.emailId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.emailId}</p>}
          </div>

          <div className="input-group">
            <input className='form-control my-3  mx-1' type='password' name='password' value={values.password} onChange={(e) => handleChange(e)} placeholder="Password" />
            {errors.password && touched.password && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '5vh', color: 'red' }} className="error">{errors.password}</p>}
          </div>
          <div className="d-grid gap-2 my-3">
            <Button variant="primary" size="md" type='submit'>
              Log In
            </Button>
          </div>

        </form>
        <div className="text-info text-center m-1" onClick={() => navigate('/')}>
          Don't have an account ? Sign Up
        </div>
      </div>
    </div>
  )
}

export default LogIn;