import React from 'react'
import "./Profile.css"
import IMG from "../../../public/IMG.jpg"
import EditIcon from '@mui/icons-material/Edit';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Navbar from '../Navbar/Navbar'

function Profile() {
  return (
    <>
      <Navbar/>
      <div className="profile">
        <div className="box">
          <div className='imgContent'>
          <img className='img' src={IMG} alt="img" />
         <div className='imgcontent'>         
         <h3>Full Name</h3>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
         </div>
          </div>
         
          <p>
            <EditIcon className='editIcon'/>
          </p>
          <p><EmailOutlinedIcon/></p>

        </div>
       
      </div>
    </>
  )
}

export default Profile