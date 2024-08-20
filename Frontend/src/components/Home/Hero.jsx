import React,{useRef} from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

import JobCard from "./JobCard.jsx";

import "./Hero.css"

function Hero() {

  const cardData = [1,2,3,4,5,6,7,8,9,10]
  const jobTypes = ["Frontend developer", "Backend developer", "UI/UX Designer", "AI Engineer", "Devops engineer", "Frontend developer", "Backend developer", "UI/UX Designer", "AI Engineer", "Devops engineer"]

  const jobListRef = useRef(null);

  const scrollLeft = () => {
      if (jobListRef.current) {
          jobListRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      }
  };

  const scrollRight = () => {
      if (jobListRef.current) {
          jobListRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      }
  };

  return (
    <div className='Hero'>
      <p className='Hero-line'>
        <span className='line1'>No 1 Job Hunt Website</span>
      </p>
      <p className='Hero-line1'>
        <span>Search, Apply &</span>
      </p>
      <p className='Hero-line2'>
        <span>Get Your <span className='line2'> Dream Jobs</span></span>
      </p>
      <p className='Hero-line3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet.
      </p>
      <p className='Hero-line4'>
        <input type='text' placeholder='Find your dream jobs' />
        <SearchOutlinedIcon className='icon' />
      </p>
      <div className="job-bar">
        <button className="arrow left-arrow" onClick={scrollLeft}><KeyboardBackspaceIcon className='iconss'/></button>
        <div className="job-list" ref={jobListRef}>
          {jobTypes.map((ele, index) => (
            <span key={index} className="jobType">{ele}</span>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={scrollRight}><EastIcon/></button>
      </div>
      <h1 className='card-h1'><span className='card-header'>Latest & Top</span> Job Openings</h1>
          <div className='jobs'>

          {
            cardData.map((ele,index)=>(
              <JobCard key={index}/>
            ))
          }


           
          </div>
    </div>
  )
}

export default Hero