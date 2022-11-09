import React from "react";
import Topbar from "./Topbar";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div>
      <Topbar />
      <div className="landing-container">
        <img src="newlanding.jpeg" className="landing-image" alt="Panda Express"></img>
        <div className="center-content"> 
        <h1 className="landing-text"> <b>PANDA EXPRESS</b> </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
