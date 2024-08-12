import React from 'react'
import "./Login.css"

import Navbar from '../Navbar/Navbar.jsx';

//MUI imports
import { Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <Navbar />
            <div className="login">
                <div className="loginn">
                <h1>Sign up</h1>
                <form action="">
                    


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
                    <Button className='loginbtn'>Login</Button>
                    <p>Don't have an account? <Link to="/signup">signup</Link></p>
                    
                </form>
            </div>
            </div>

        </>
    )
}

export default Login