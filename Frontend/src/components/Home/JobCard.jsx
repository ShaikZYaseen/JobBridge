import React from 'react'
import "./JobCard.css"

function jobCard() {
  return (
    <div className='card'>
      <h1>Company Name</h1>
      <p className='country'>India</p>
      <h3>Job Title</h3>
      <p>Lorem ipsum dolor, sit amet consectetur .</p>
      <p className='badges'><span className="badge1">12 positions</span><span className='badge2'>Part time</span><span className='badge3'>24 LPA</span></p>
    </div>
  )
}

export default jobCard