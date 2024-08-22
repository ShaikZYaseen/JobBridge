import React from "react";
import "./Profile.css";
import IMG from "../../../public/IMG.jpg"; // Make sure the path is correct
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Navbar from "../Navbar/Navbar";
import Skill from "./Skill";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="box">
          <div className="boxContent">
            <div className="imgContent">
              <img className="img" src={IMG} alt="Profile" />
              <div className="imgcontent">
                <h3>Full Name</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
            </div>
            <p>
              <EditIcon className="editIcon" />
            </p>
          </div>
          <div className="emailLine">
            <EmailOutlinedIcon className="emailIcon" />
            Shaik@gmail.com
          </div>
          <div className="phoneLine">
          <CallOutlinedIcon className="phoneIcon"/> + 999999999   
        </div>
        <div className="skills">
         <span className="skillWord">Skills :</span> 
         <span>
          <Skill/>
          </span> 
        </div>
        <div className="resumeDiv">Resume</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
