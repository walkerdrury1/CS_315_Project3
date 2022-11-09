import React, { useEffect } from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal } from "../../actions";
import { deleteIndex } from "../../actions";


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

    const clearCart = () => {
        props.items.map((item, index) => {
            return props.deleteIndex(0);
        })
    }

    const calculateCost = (name) => {
        let x = 0;
        if (name === "Bowl") {
            x = 7.5;
        } else if (name === "Plate") {
            x = 9;
        } else if (name === "Bigger Plate") {
            x = 10.5;
        }

        return <div>${x.toFixed(2)}</div>
    }

    const displayCheckout = () => {
        console.log(props.items)
        return props.items.map((item, index) => {
            if (item.combo === "A La Carte") {
                return item.items.map((item) => {
                    return (
                        <div>
                            <div className='ui top attached segment'>
                                <div className='ui padded grid container'>
                                    <div className='fourteen wide column'>
                                        <h1>{item.name}</h1>
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
                    return <li value="-">{list_item.name}</li>;
                });
                return (
                    <div>
                        <div className='ui top attached segment'>
                            <div className='ui padded grid container'>
                                <div className='fourteen wide column'>
                                    <h1>{item.combo}</h1>
                                </div>
                                <div className='two wide column'>
                                    <button
                                        className='ui red button'
                                        tabIndex={0}
                                        onClick = {() => props.deleteIndex(index)}
                                    >
                                        X
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        <div className='ui attached segment'>
                            <ol className="ui list">{list}</ol>
                        </div>
                        <div className='ui bottom attached segment'>
                            20
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
                            <button class='ui negative button' 
                            tabIndex={0}
                            onClick = {() => clearCart()}>
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
    deleteIndex: deleteIndex
})(Checkout);
