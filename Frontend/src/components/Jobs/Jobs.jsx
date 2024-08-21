import React, { useState } from 'react'
import "./Jobs.css"
import Job from './Job'
import Sidebar from './Sidebar';


import Navbar from '../Navbar/Navbar'
import { Button } from '@mui/material';

function Jobs() {
  const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

  const jobs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

  return (
    <>       
    <Navbar/>
    <div className="jobss">
      <div className="jobss-one">
      
      <Sidebar />
      </div>
    <div className='jobs-container'>
      {
        jobs.map((ele,index)=>(
          <Job key={index}/>
        ))
      }
    </div>
    </div>
  
    </>
  )
}

export default Jobs