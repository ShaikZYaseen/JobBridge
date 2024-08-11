import React, { useState } from 'react'
import "./Navbar.css"

//MUi imports
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { Avatar, Typography } from '@mui/material';


function Navbar() {


    //MUI methods
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let user = true;


    return (
        <>
            <div className="navbar">
                <div className='navbar-logo'>
                    <h1>Job<span>Bridge</span></h1>
                </div>
                <div className='navbar-content'>
                    <div className='navbar-options'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </div>{
                        !user ? (
                            <div className="navbar-buttons">
                                <Button size='small' variant="contained" >Signup</Button>
                                <Button size="small" variant="outlined" >Login</Button>

                            </div>
                        ) : (
                            <div className='avatar'>
                                <Avatar aria-describedby={id} variant="contained" onClick={handleClick}
                                    alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography className='avatar-one' sx={{ p: 2 }}> <div>
                                        <Avatar sx={{ width: 30, height: 30 }}
                                            alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </div> <p>Shaik Yaseen
                                    <p className='avatar-desc'>Lorem ipsum dolor sit amet.</p>

                                    </p>
                                    </Typography>

                                </Popover>
                                
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar