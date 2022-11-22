import React from "react";
import Topbar from "./Topbar";
import { connect } from "react-redux";
import "./LandingPage.css"
import { setPage } from "../actions";


const LandingPage = (props) => {
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

            <div className="landing-button">
              {/* <a href="">
                <button type="button" onClick={'/SignInPage'}><span className="xyz"></span> LOG IN</button>
              </a> */}
                <button onClick = {() => props.setPage("Combo Page")} type="button"><span className="xyz"></span> ORDER NOW </button>
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
const mapStateToProps = (state) => {
  return {
      page: state.page,
  };
};

export default connect(mapStateToProps, {
  setPage: setPage,
})(LandingPage);
