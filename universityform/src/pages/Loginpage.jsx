import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Authentication/authdataSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css' ; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/'); // Go to Form on success
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Login</h1>
        <form className="from-field" onSubmit={handleSubmit}>
            <div className="form-row">
                <input 
                    className="input-field"
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            </div>
            <div className="form-row">
                <input 
                    className="input-field"
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </div>
            
            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            
            <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Checking..." : "Login"}
            </button>
        </form>
        <p style={{textAlign:'center', marginTop:'10px'}}>
            New here? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;