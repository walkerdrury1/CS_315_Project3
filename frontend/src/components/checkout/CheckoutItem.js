import React from "react";
import "./CheckoutItem.css";

const CheckoutItem = props => {
    return (
        <div className="checkoutItem">
            <div className="itemName">
                {props.name}
            </div>
            <div className="cost">
                ${props.cost}
            </div>
        </div>
    )
}

export default CheckoutItem