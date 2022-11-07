import React from "react";
import CheckoutItem from "./CheckoutItem";
import CheckoutButton from "./CheckoutButton";
import "./Checkout.css";

const Checkout = props => {
    return (
        <div className="CheckoutMenu">
            <CheckoutItem 
                name = "Orange Chicken"
                cost = {10.00}
            />
            <CheckoutItem 
                name = "Spicy Ooh Beef"
                cost = {69.00}
            />
            <CheckoutItem 
                name = "Sexy Lady Linguine"
                cost = {420.00}
            />
            <CheckoutButton />
        </div>
    )
}

export default Checkout