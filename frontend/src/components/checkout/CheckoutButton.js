import React from "react";
import "./CheckoutButton.css"

function checkout() {
    alert('Checkout Complete!');
}

const CheckoutButton = () => {
    return (
        <button onClick={checkout} className="checkoutButton">Checkout</button>
    )
}

export default CheckoutButton