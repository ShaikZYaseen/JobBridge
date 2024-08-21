import React from 'react'
import "./Browse.css"

import Navbar from "../Navbar/Navbar"
import Job from "../Jobs/Job"

function Browse() {

    const results = [1,2,3]

  return (
    <div className='browsee'>
        <Navbar/>
        <div className='browse'>
            <h2>Search results(3)</h2>
            <div className="jobss">
            {
                    results.map((ele,index)=>(
                        <Job key={index}/>
                    ))
                }
            </div>
               
        </div>
    </div>
  )
}

export default Browse