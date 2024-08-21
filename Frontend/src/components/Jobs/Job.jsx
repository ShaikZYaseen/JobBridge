import React from 'react'
import IMG from '../../../public/IMG.jpg'
import "./Job.css"
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Button } from '@mui/material';

function Job() {
  return (
    <>
      <div className="job">
        <p className='job-one'><span>2 days ago</span><span><BookmarkBorderOutlinedIcon className='bookmarkIcon' /></span></p>
        <div className='job-two'>
          <div className='company-img'><img src={IMG} alt="logo" /></div>
          <div className='company-content'>
            <p className='company-name'>Company Name</p>
            <p>India</p>
          </div>
        </div>
        <div className="job-three">
          Title
        </div>
        <p className="job-four">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus vitae illo consectetur! Repellendus, natus nihil?
        </p>
        <p className='badges'><span className="badge1">12 positions</span><span className='badge2'>Part time</span><span className='badge3'>24 LPA</span></p>
        <div className='btns'>
          <Button variant='contained' sx={{
            minWidth: '50px',
            padding: '2px 8px',
            fontSize: '0.55rem',
            marginRight:'10px'

          }} size="small">Details</Button>
          <Button variant='contained' sx={{
            minWidth: '50px',
            backgroundColor:'white',
            color:'black',
            padding: '2px 8px',
            fontSize: '0.55rem'
          }} size="small">Save for later</Button>
        </div>
      </div>
    </>
  )
}

export default Job