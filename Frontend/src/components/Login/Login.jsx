import React, { useState } from 'react';
import './Login.css';
import Navbar from '../Navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'mui-sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../../store/slices/authSlice.js';
import { Button, TextField, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading); // Get loading state from Redux

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // Dispatch loading state to true

    const form = {
      email: input.email,
      password: input.password,
    };

    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/login', form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data));
        
        toast.success('Login successful');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.log(error.response.data);
    } finally {
      dispatch(setLoading(false)); // Dispatch loading state to false
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="loginn">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <div>
              <TextField
                id="standard-basic"
                label="email"
                name="email"
                variant="standard"
                value={input.email}
                onChange={handleChange}
                className="small-text-field"
                disabled={loading} // Disable input while loading
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="password"    
                type="password"
                name="password"
                variant="standard"
                value={input.password}
                onChange={handleChange}
                className="small-text-field"
                disabled={loading} // Disable input while loading
              />
            </div>
            <div className="loginbtn">
              <Button 
                type="submit" 
                className="loginbtn"
                disabled={loading} // Disable button while loading
              >
                {loading ? <CircularProgress size={24} /> : 'Login'} {/* Show spinner or Login text */}
              </Button>
            </div>
            <div className="line1">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
