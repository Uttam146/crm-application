import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaUserAlt } from "react-icons/all.js";


function LoginAndSignUp() {
    const [showSignUp, setShowSignUp] = useState(true);
    const [data, setData] = useState({ userId: '', userName: '', emailId: '', password: '' });
    const [role, setRole] = useState('Select Role');
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: [e.target.value] });
    }
    const onLogin = () => {
        setData({ userId: '', userName: '', emailId: '', password: '' });
        setShowSignUp(!showSignUp);
    }
    return (
        <div className="bg-info d-flex justify-content-center align-items-center vh-100">
            <div style={{ width: '30rem' }} className="card p-3 rounded-4 shadow-lg">
                <h4 style={{ textAlign: 'center' }}>{showSignUp ? 'Sign Up' : 'Log In'}</h4>
                <form>
                    <div className="input-group">
                        <input className='form-control m-1' type='text' name='userId' value={data.userId} onChange={(e) => handleChange(e)} placeholder="Enter the UserId" />
                    </div>
                    {
                        showSignUp &&
                        <>
                            <div className="input-group">
                                <input className='form-control m-1' type='text' name='userName' value={data.userName} onChange={(e) => handleChange(e)} placeholder="Enter the UserName" />
                            </div>
                            <div className="input-group">
                                <input className='form-control m-1' type='text' name='emailId' value={data.emailId} onChange={(e) => handleChange(e)} placeholder="Enter the EmailId" />
                            </div>
                        </>
                    }
                    <div className="input-group">
                        <input className='form-control m-1' type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} placeholder="Enter the Password" />
                    </div>
                    {
                        showSignUp &&
                        <Dropdown>
                            <Dropdown.Toggle className='form-control text-white m-1 d-inline-block' variant="info">
                            {role}
                            </Dropdown.Toggle>
                  
                        <Dropdown.Menu className='w-100'>
                        <Dropdown.Item href="#/action-1" disabled>Select the Below User Role</Dropdown.Item>
                          <Dropdown.Item href="#/action-1" name='Enginner' onClick={(e)=>setRole(e.target.name)}>Enginner <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
                          <Dropdown.Item href="#/action-2" name='Admin' onClick={(e)=>setRole(e.target.name)}>Admin <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
                          <Dropdown.Item href="#/action-3" name='Support' onClick={(e)=>setRole(e.target.name)}>Support <FaUserAlt size={13} style={{ color: 'blue' }} /></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    }
                    <div className="input-group">
                        <input className='btn btn-info form-control m-2 text-white' type='submit' value='Log In' />
                    </div>
                    <div className="text-info text-center m-1" onClick={() => onLogin()}>
                        {showSignUp ? `Already have an account ? Login Up` : `Don't have an account ? Sign Up`}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginAndSignUp;
