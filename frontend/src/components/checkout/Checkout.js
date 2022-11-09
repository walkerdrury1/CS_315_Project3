import React, { useEffect } from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal } from "../../actions";

const Checkout = (props) => {
    const processTransactions = async () => {
        const itemList = [];
        props.items.map((item) => {
            item.items.map((order) => {
                itemList.append(order);
            });
        });
        await axios.post(
            "https://tyson-express.onrender.com/process-transaction",
            { cost: props.total, items: itemList }
        );
    };

    useEffect(() => {
        props.calculateTotal(props.items);
    }, [props.items]);

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
                        <div className='two wide column'>${props.total}</div>
                    </div>
                    <div className='ui bottom attached segment'>
                        <div class='fluid ui buttons'>
                            <button
                                class='ui positive button'
                                onClick={processTransactions}
                            >
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
        total: state.total,
    };
};
export default connect(mapStateToProps, {
    calculateTotal: calculateTotal,
})(Checkout);
