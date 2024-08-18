import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import axios from "axios";
import "./Signup.css";

// MUI imports
import Alert from '@mui/material/Alert';
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from 'mui-sonner';

function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "",
    file: ""
  });

  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [errors, setErrors] = useState({});

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.username) newErrors.username = "Username is required.";
    if (!input.fullName) newErrors.fullName = "Full name is required.";
    if (!input.email) newErrors.email = "Email is required.";
    if (!input.password) newErrors.password = "Password is required.";
    if (!input.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/signup", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Signup successful");

        // Delay the redirection by 3 seconds (3000 milliseconds)
        setTimeout(() => {
          navigate("/login");
        }, 3000); 
      }
    } catch (error) {
      setAlert({ message: "Signup failed. Please try again.", severity: "error" });
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signupinside">
          <h1>Sign up</h1>
          {alert.message && (
            <Alert severity={alert.severity} style={{ marginBottom: "20px" }}>
              {alert.message}
            </Alert>
          )}
          <div>
            <form onSubmit={submitHandler}>
              <div>
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  value={input.username}
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username}
                  className="small-text-field"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <TextField
                  id="fullName"
                  label="Full name"
                  name="fullName"
                  value={input.fullName}
                  variant="standard"
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  className="small-text-field"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  value={input.email}
                  variant="standard"
                  error={!!errors.email}
                  helperText={errors.email}
                  className="small-text-field"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={input.password}
                  variant="standard"
                  error={!!errors.password}
                  helperText={errors.password}
                  className="small-text-field"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="padd">
                <div className="drop">
                  <InputLabel id="role-select-label">Role :</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={input.role}
                    id="role-select"
                    label="Role"
                    onChange={changeEventHandler}
                    name="role"
                    error={!!errors.role}
                    sx={{ width: '80px', height: '25px' }}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="recruiter">Recruiter</MenuItem>
                  </Select>
                  {errors.role && (
                    <p style={{ color: 'red', fontSize: '12px' }}>{errors.role}</p>
                  )}
                </div>
                <div className="imgdrop">
                  <TextField
                    className="small-text-field"
                    type="file"
                    inputProps={{ accept: ".jpg,.jpeg" }}
                    onChange={changeFileHandler}
                    variant="standard"
                    sx={{ marginBottom: "16px" }}
                  />
                </div>
                <div className="submitbtn">
                  <Button className="submitbutton" variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
                <p className="line">Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
