import React from "react";
import { setPage } from "../../actions";
import { connect } from "react-redux";
import Topbar from "../Topbar";

const Confirmation = (props) => {

    const backToHome = () => {
        setTimeout(() => {
            props.setPage("landing page");
        }, "3000")
    }

    return (
        <div>
            <Topbar />
            <br />
            <div className="ui text container">
                <div className="ui raised padded center aligned segment">
                    <h1 className="ui header">Order complete</h1>
                    <h4>Thank you for your purchase!</h4>
                    <h4>Returning you to the landing page.</h4>
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