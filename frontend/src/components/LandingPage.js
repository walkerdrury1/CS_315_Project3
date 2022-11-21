import React from "react";
import Topbar from "./Topbar";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <html>
      <head>
        <title> Tyson Express</title>
      </head>

      <body>
        <div className="landing-background">
          <div> <Topbar /> </div>
          <div className="landing-content">
            <h1>TYSON EXPRESS</h1>
            <p>Thith Is Way Better Than Panda Expreth.</p>

            <div className="function">
              <button type="button"><span></span> LOG IN</button>
              <button type="button"><span></span> ORDER NOW </button>
            </div>

          </div>
        </div>
      </body>
    </html>

    //   {/* <div className="landing-container">
    //     <img src="newlanding.jpeg" className="landing-image" alt="Panda Express"></img>
    //     <div className="center-content"> 
    //     <h1 className="landing-text"> <b>PANDA EXPRESS</b> </h1>
    //     </div>
    //   </div> */}
    // </div>
  );
};

export default LandingPage;
