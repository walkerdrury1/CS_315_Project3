import React from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";

const Checkout = props => {
    // const order_items = [
    //     {id : 0, name : "Orange Chicken", cost : 10.00},
    //     {id : 1, name : "Spicy Ooh Beef", cost : 69.00},
    //     {id : 2, name : "Sexy Lady Linguine", cost : 420.00},
    //     {id : 3, name : "My Booty Cheeks", cost : 0.00}
    // ]
    console.log(props.items);

    const order_items = [
        {combo : "al a carte", items : [{name : "orange chicken", cost : 10}]}
    ]

    const total = order_items.reduce((sum, curr) => sum = sum + curr.cost, 0);

    const displayALaCarte = () => {
        <div>
                    <div className = "ui top attached header">
                        <div className="ui padded grid container">
                            <div className="fourteen wide column">
                                {item.items.name}
                            </div>
                            <div className="two wide column">
                                <button className="ui red button" tabIndex={0}>X</button>
                            </div>
                        </div>
                    </div>
                    <div className="ui bottom attached segment">
                        2
                    </div>
                    <div className="ui section divider"></div>
                </div>
    }

    const displayCheckout = () => {
        return props.items.map((item) => {
            {displayALaCarte}
        });
    };

    return (
        <div>
            <Topbar />
            <br />
            <div className="ui text container">
                <div className='to-center'>
                    <h1>Checkout</h1>
                </div>
                <div className="ui section divider"></div>
                {displayCheckout}
                <div className="ui top attached header">
                    <div className="ui padded grid">
                        <div className="fourteen wide column">
                            Total:
                        </div>
                        <div className="two wide column">
                            ${total}
                        </div>
                    </div>
                    <div className="ui bottom attached segment">
                    <div class="fluid ui buttons">
                            <button class="ui positive button">Complete Order</button>
                                <div class="or"></div>
                            <button class="ui negative button">Clear Cart</button>
                        </div>
                    </div>
                </div>
                <div className="ui section divider"></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        items : state.items
    }
}

export default connect (mapStateToProps) (Checkout)