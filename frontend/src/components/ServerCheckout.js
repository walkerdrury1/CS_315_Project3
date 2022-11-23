import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal, setPage } from "../actions";
import { deleteIndex } from "../actions";
import { setCombo } from "../actions";
import { deleteCartItem } from "../actions";

const ServerCheckout = ({
    transactionList,
    clearCart,
    clearItem,
    setWaiting,
    reset
}) => {
    const processTransactions = async () => {
        setWaiting(true);
        const to_post = [];
        transactionList.forEach((element) => {
            if (element.name) {
                to_post.push(element);
            } else {
                element.items.forEach((e) => {
                    to_post.push(e);
                });
            }
        });
        await axios.post(
            "https://tyson-express.onrender.com/process-transaction",
            { cost: getTotalCost(), items: to_post }
        );
        setWaiting(false);
        reset()
    };

    console.log(transactionList);
    const getTotalCost = () => {
        if (transactionList === null || transactionList.length === 0) {
            return 0;
        }
        let sum = 0;
        transactionList.map((item) => {
            sum += item.cost;
        });
        return sum;
    };
    const displayCheckout = () => {
        return transactionList.map((item, index) => {
            if (item.name) {
                return (
                    <div className='ui attached segment'>
                        <div className='ui grid container'>
                            <div className='row'>
                                <div className='left floated ten wide column'>
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
                                        onClick={() => clearItem(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='right floated  four wide column'>
                                    <h3>${item.cost.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                const list = item.items.map((list_item) => {
                    return (
                        <li value='-'>
                            {list_item.name.replace(
                                /(^\w{1})|(\s+\w{1})/g,
                                (letter) => letter.toUpperCase()
                            )}
                        </li>
                    );
                });
                return (
                    <div className='ui attached segment'>
                        <div className='ui grid container'>
                            <div className='row'>
                                <div className='left floated ten wide column'>
                                    <h1>{item.type}</h1>
                                </div>

                                <div className='right floated four wide column'>
                                    <button
                                        className='ui red button'
                                        tabIndex={0}
                                        onClick={() => clearItem(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='left floated ten wide column'>
                                    <ol className='ui list'>
                                        <h4>{list}</h4>
                                    </ol>
                                </div>
                                <div className='right floated four wide column'>
                                    <h3>${item.cost.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className='max-width'>
            <div className='server-checkout'>
                {displayCheckout()}
                <div className='ui attached segment'>
                    <div className='ui padded grid'>
                        <div className='left floated column'>
                            <h2>Total:</h2>
                        </div>
                        <div className='right floated five wide column'>
                            <h2>${getTotalCost().toFixed(2)}</h2>
                        </div>
                    </div>

                    <div class='fluid ui buttons'>
                        <button
                            class='ui positive button'
                            onClick={processTransactions}
                        >
                            Complete Order
                        </button>
                        <div class='or'></div>
                        <button
                            class='ui negative button'
                            tabIndex={0}
                            onClick={clearCart}
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
