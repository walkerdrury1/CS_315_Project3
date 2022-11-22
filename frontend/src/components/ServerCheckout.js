import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal, setPage } from "../actions";
import { deleteIndex } from "../actions";
import { setCombo } from "../actions";
import { deleteCartItem } from "../actions";

const ServerCheckout = (props) => {
    const processTransactions = async () => {
        await axios.post(
            "https://tyson-express.onrender.com/process-transaction",
            { cost: props.cart.total, items: props.cart }
        );

        clearCart();
    };

    useEffect(() => {
        calculateTotal(props.cart);
    }, [props.cart.items]);

    const clearCart = () => {
        props.cart = [];
    };

    const calculateCost = (name) => {
        let x = 0;
        if (name === "Bowl") {
            x = 7.5;
        } else if (name === "Plate") {
            x = 9;
        } else if (name === "Bigger Plate") {
            x = 10.5;
        }

        return <div>${x.toFixed(2)}</div>;
    };

    const displayCheckout = () => {
        console.log(props.cart)
        return props.cart.map((item, index) => {
            if (item.combo === "A La Carte") {
                return item.items.map((item, itemIndex) => {
                    return (
                        <div className="ui attached segment">
                                <div className='ui grid container'>
                                    <div className="row">
                                        <div className='left floated column'>
                                            <h1>
                                                {item.name.replace(
                                                    /(^\w{1})|(\s+\w{1})/g,
                                                    (letter) => letter.toUpperCase()
                                                )}
                                            </h1>
                                        </div>
                                        <div className='right floated four wide column'>
                                            <button
                                                className='ui red button'
                                                tabIndex={0}
                                                onClick={() =>
                                                    props.cart.deleteCartItem(
                                                        index,
                                                        itemIndex
                                                    )
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="right floated  four wide column">
                                            <h3>${item.cost.toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                        </div>
                    );
                });
            } else {
                const list = item.items.map((list_item) => {
                    return <li value='-'>{list_item.name.replace(
                        /(^\w{1})|(\s+\w{1})/g,
                        (letter) => letter.toUpperCase()
                    )}</li>;
                });
                return (
                    <div className="ui attached segment">
                        <div className='ui grid container'>
                            <div className="row">
                                <div className='left floated column'>
                                    <h1>{item.combo}</h1>
                                </div>
                                
                                <div className='right floated four wide column'>
                                    <button
                                        className='ui red button'
                                        tabIndex={0}
                                        onClick={() => props.cart.deleteIndex(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="left floated column">
                                    <ol className='ui list'><h4>{list}</h4></ol>
                                </div>
                                <div className="right floated four wide column">
                                    <h3>{calculateCost(item.combo)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div>
            <div className='server-checkout'>
                {displayCheckout()}
                <div className='ui attached segment'>
                    <div className='ui padded grid'>
                        <div className='left floated column'><h2>Total:</h2></div>
                        <div className='right floated five wide column'><h2>${props.cart.total.toFixed(2)}</h2></div>
                    </div>
                    
                        <div class='fluid ui buttons'>
                            <button
                                class='ui positive button'
                                onClick={
                                    processTransactions
                                }
                            >
                                Complete Order
                            </button>
                            <div class='or'></div>
                            <button
                                class='ui negative button'
                                tabIndex={0}
                                onClick={() => clearCart()}
                            >
                                Clear Cart
                        </button>
                    </div>
                </div>
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
    deleteIndex: deleteIndex,
    setPage: setPage,
    setCombo: setCombo,
    deleteCartItem: deleteCartItem,
})(ServerCheckout);
