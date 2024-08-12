import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import "./Signup.css";

//MUI imports
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function Signup() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can handle the file upload here
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signupinside">
          <h1>Sign up</h1>
          <div>
            <form action="">
              <p>
                <TextField
                  id="standard-basic"
                  label="username"
                  variant="standard"
                  className="small-text-field"
                />
              </p>
              <p>
                <TextField
                  id="standard-basic"
                  label="full name"
                  variant="standard"
                  className="small-text-field"
                />
              </p>
              <p>
                <TextField
                  id="standard-basic"
                  label="email"
                  variant="standard"
                  className="small-text-field"
                />
              </p>
              <p>
                <TextField
                  id="standard-basic"
                  label="password"
                  variant="standard"
                  className="small-text-field"
                />
              </p>
              <p className="padd">
                <TextField
                                  className="small-text-field "

                  type="file"
                  inputProps={{ accept: ".pdf,.doc,.docx" }} // Specify accepted file types
                  onChange={handleFileChange}
                  variant="standard"
                  sx={{ marginBottom: "16px" }} // Adjust styling as needed
                />
                <p> <Button className="submitbutton" variant="contained" color="primary">
                  Submit
                </Button></p>
                <p>already have an account? <Link to="/login">login</Link></p>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
