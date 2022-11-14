import React, { useEffect } from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal, setPage } from "../../actions";
import { deleteIndex } from "../../actions";
import { setCombo } from "../../actions";
import { deleteCartItem } from "../../actions";

const Checkout = (props) => {
    const processTransactions = async () => {
        const itemList = [];
        props.items.map((item) => {
            item.items.map((order) => {
                itemList.push(order);
            });
        });
        await axios.post(
            "https://tyson-express.onrender.com/process-transaction",
            { cost: props.total, items: itemList }
        );

        clearCart();
        
        props.setPage("Confirmation");
    };

    useEffect(() => {
        props.calculateTotal(props.items);
    }, [props.items]);

    const clearCart = () => {
        props.items.map((item, index) => {
            return props.deleteIndex(0);
        });
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
        console.log(props.items);
        return props.items.map((item, index) => {
            if (item.combo === "A La Carte") {
                return item.items.map((item, itemIndex) => {
                    return (
                        <div className="ui attached segment">
                                <div className='ui grid container'>
                                    <div className="row">
                                        <div className='left floated fourteen wide column'>
                                            <h1>
                                                {item.name.replace(
                                                    /(^\w{1})|(\s+\w{1})/g,
                                                    (letter) => letter.toUpperCase()
                                                )}
                                            </h1>
                                        </div>
                                        <div className='right floated two wide column'>
                                            <button
                                                className='ui red button'
                                                tabIndex={0}
                                                onClick={() =>
                                                    props.deleteCartItem(
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
                                        <div className="right floated two wide column">
                                            <h3>${item.cost.toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                        </div>
                    );
                });
            } else {
                const list = item.items.map((list_item) => {
                    return <li value='-'>{list_item.name}</li>;
                });
                return (
                    <div className="ui attached segment">
                        <div className='ui grid container'>
                            <div className="row">
                                <div className='left floated fourteen wide column'>
                                    <h1>{item.combo}</h1>
                                </div>
                                
                                <div className='right floated two wide column'>
                                    <button
                                        className='ui red button'
                                        tabIndex={0}
                                        onClick={() => props.deleteIndex(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="left floated fourteen wide column">
                                    <ol className='ui list'><h4>{list}</h4></ol>
                                </div>
                                <div className="right floated two wide column">
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
            <Topbar />
            <br />
            <div className='ui text container'>
                <div className='to-center'>
                    <h1>Checkout</h1>
                </div>
                <div className='ui section divider'></div>
                {displayCheckout()}
                <div className='ui attached segment'>
                    <div className='ui padded grid'>
                        <div className='fourteen wide column'><h2>Total:</h2></div>
                        <div className='two wide column'><h2>${props.total.toFixed(2)}</h2></div>
                    </div>
                    <div className='ui attached segment'>
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
    deleteIndex: deleteIndex,
    setPage: setPage,
    setCombo: setCombo,
    deleteCartItem: deleteCartItem,
})(Checkout);
