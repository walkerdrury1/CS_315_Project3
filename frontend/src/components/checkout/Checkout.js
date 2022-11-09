import React from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";

const Checkout = (props) => {
    const order_items = [
        { id: 0, name: "Orange Chicken", cost: 10.0 },
        { id: 1, name: "Spicy Ooh Beef", cost: 69.0 },
        { id: 2, name: "Sexy Lady Linguine", cost: 420.0 },
    ];

    const total = order_items.reduce((sum, curr) => (sum = sum + curr.cost), 0);

    const displayCheckout = () => {
        return props.items.map((item) => {
            if (item.combo === "A La Carte") {
                return item.items.map((item) => {
                    return (
                        <div>
                            <div className='ui top attached header'>
                                <div className='ui padded grid container'>
                                    <div className='fourteen wide column'>
                                        {item.name}
                                    </div>
                                    <div className='two wide column'>
                                        <button
                                            className='ui red button'
                                            tabIndex={0}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='ui bottom attached segment'>
                                ${item.cost}
                            </div>
                            <div className='ui section divider'></div>
                        </div>
                    );
                });
            } else {
                const list = item.items.map((list_item) => {
                    return <div>{list_item.name}</div>;
                });
                return (
                    <div>
                        <div className='ui top attached header'>
                            <div className='ui padded grid container'>
                                <div className='fourteen wide column'>
                                    <div>{item.combo}</div>
                                    <div className='ui container'>{list}</div>
                                </div>
                                <div className='two wide column'>
                                    <button
                                        className='ui red button'
                                        tabIndex={0}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='ui bottom attached segment'>
                            ${item.cost}
                        </div>
                        <div className='ui section divider'></div>
                    </div>
                );
            }
        });
    };

    return (
        <div>
            <Topbar />
            <br />
            <div className='ui text container'>
                <div className='to-center'>
                    <h1>Checkout</h1>
                </div>
                <div className='ui section divider'></div>
                {displayCheckout()}
                <div className='ui top attached header'>
                    <div className='ui padded grid'>
                        <div className='fourteen wide column'>Total:</div>
                        <div className='two wide column'>${total}</div>
                    </div>
                    <div className='ui bottom attached segment'>
                        <div class='fluid ui buttons'>
                            <button class='ui positive button'>
                                Complete Order
                            </button>
                            <div class='or'></div>
                            <button class='ui negative button'>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className='ui section divider'></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
    };
};
export default connect(mapStateToProps)(Checkout);
