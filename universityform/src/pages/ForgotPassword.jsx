import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestRestpassword } from '../Authentication/authdataSlice.jsx';
import {  Link } from 'react-router-dom';
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestRestpassword(email));
  };

  return (
    <div className="form1-container" style={{maxWidth: '400px'}}>
      <div className="form1-box">
        <h1 className='forgotpassword-heading'>Forgot Password?</h1>
        <p style={{textAlign:'center', color:'#666', marginBottom:'20px'}}>
           Enter your email to receive a reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input 
             className="input-field"
             placeholder="Enter your email" 
             value={email}                                                   
             onChange={(e) => setEmail(e.target.value)}
             required
          />
          <button className="btn submit-btn" style={{marginTop:'15px'}}>
            Send Reset Link
          </button>

        </form>
           <p style={{textAlign:'center', marginTop:'10px'}}>
               Back to login ? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;