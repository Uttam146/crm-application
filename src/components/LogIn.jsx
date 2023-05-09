import { useEffect, useState } from "react";
import { LogInschema } from '../schemas/LogInSchema';
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { SignInForm } from "../api/userAuth";
import Alert from 'react-bootstrap/Alert';


function LogIn() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const onSubmit = async (values, actions) => {
    const data = {
      email: values.emailId,
      password: values.password
    };

    SignInForm(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token',res.data.accessToken);
        localStorage.setItem('userType',res.data.userType);
        navigate('/admin');
      })
      .catch((err) => {
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
    emailId: "",
    password: "",
  },
  validationSchema: LogInschema,
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
  <div className="bg-info d-flex  flex-column justify-content-center align-items-center vh-100 ">
    <div style={{ marginTop: '-15vh' }} className="d-flex justify-content-center align-items-center" >
      {
        alert &&
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          <p>
            {alertMessage}
          </p>

        </Alert>
      }
    </div>
    <div style={{ width: '30rem', marginTop: '10vh' }} className="card p-3 rounded-4 shadow-lg">
      <h4 style={{ textAlign: 'center' }}>Log In</h4>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input className='form-control my-3  mx-1' type='text' name='emailId' value={values.emailId} onChange={(e) => handleChange(e)} placeholder="Enter the EmailId" />
          {errors.emailId && touched.emailId && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '9.5vh', color: 'red' }} className="error">{errors.emailId}</p>}
        </div>

        <div className="input-group">
          <input className='form-control my-3  mx-1' type='password' name='password' value={values.password} onChange={(e) => handleChange(e)} placeholder="Enter the Password" />
          {errors.password && touched.password && <p style={{ marginLeft: '9px', fontSize: '90%', position: 'absolute', marginTop: '9.5vh', color: 'red' }} className="error">{errors.password}</p>}
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