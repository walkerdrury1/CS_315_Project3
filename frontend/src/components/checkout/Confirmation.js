import React from "react";
import { setPage } from "../../actions";
import { connect } from "react-redux";
import Topbar from "../Topbar";

const Confirmation = (props) => {

    const backToHome = () => {
        setTimeout(() => {
            props.setPage("landing page");
        }, "15000")
    }

    return (
        <div>
            <Topbar />
            <br />
            <div className="ui text container">
                <div className="ui raised padded center aligned segment">
                    <h1 className="ui header">Order complete</h1>
                    <h4>Thank you for your purchase!</h4>
                </div>
                <div className="fluid ui buttons">
                    <button className="ui blue button" onClick={() => props.setPage("landing page")}>
                        Go Home
                    </button>
                    <div className="or"></div>
                    <button className="ui positive button" onClick={() => props.setPage("Combo Page")}>
                        Make Another Order
                    </button>
                </div>
            </div>
            {backToHome()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    setPage: setPage
}) (Confirmation);