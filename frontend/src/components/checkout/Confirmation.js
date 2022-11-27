import React, { useEffect, useState } from "react";
import { setPage } from "../../actions";
import { connect } from "react-redux";
import Topbar from "../Topbar";

const Confirmation = (props) => {

    const [highlightNum, changeHighlight] = useState(-1);

    const backToHome = () => {
        setTimeout(() => {
            props.setPage("landing page");
        }, "15000")
    }
    useEffect(() => {
        const handleKey = (event) => {
        if (event.keyCode === 13) {
            // enter
            
            if (highlightNum === -1)
                return;
            
            event.preventDefault();
            const goHome = document.querySelector('.ui.blue.button')
            const newOrder = document.querySelector('.ui.positive.button')
            switch(highlightNum) {
                case 0:
                    goHome.click()
                    return
                case 1:
                    newOrder.click()
                    return
            }

        }
        else if (event.keyCode === 9) {
            // tab
                event.preventDefault();
                const goHome = document.querySelector('.ui.blue.button')
                const newOrder = document.querySelector('.ui.positive.button')

                if (highlightNum === -1) {
                    goHome.style.opacity = "0.5"
                    changeHighlight(highlightNum+1)
                }
                else if (highlightNum === 0) {
                    goHome.style.opacity = "1"
                    newOrder.style.opacity = "0.5"
                    changeHighlight(highlightNum+1)
                }
                else {
                    newOrder.style.opacity = "1"
                    goHome.style.opacity = "0.5"
                    changeHighlight(0)
                }


        }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
        window.removeEventListener('keydown', handleKey);
    };
    
    
    },)

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