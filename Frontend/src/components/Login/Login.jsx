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
                <h1>Login</h1>
                <form action="">
                    


                    <div>
                        <TextField
                            id="standard-basic"
                            label="email"
                            variant="standard"
                            className="small-text-field"
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-basic"
                            label="password"
                            variant="standard"
                            className="small-text-field"
                        />
                    </div>
                    <div className='loginbtn'>                    <Button className='loginbtn'>Login</Button>
                    </div>
                    <div className='line1'>Don't have an account? <Link to="/signup">signup</Link></div>
                    
                </form>
            </div>
            </div>

        </>
    )
}

export default Login