import React from "react";
import "./Popup.css";

const Popup = ({ children, setPopup }) => {
    return (
        <div className='popup-box'>
            <div className='box'>
                {children}
            </div>
        </div>
    );
};

export default Popup;
