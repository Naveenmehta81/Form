import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetpassword } from '../Authentication/authdataSlice.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import '../Form.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetpassword({ token, newPassword }))
      .unwrap()
      .then(() => {
        navigate('/login'); // after changing the old to new passwoard it redirect to login page 
      });
  };

  return (
    <div className="form1-container" style={{maxWidth: '400px'}}>
      <div className="form1-box">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input 
             className="input-field"
             type="password"
             placeholder="New Password" 
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             required
          />
          <button className="btn submit-btn" style={{marginTop:'15px'}}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 