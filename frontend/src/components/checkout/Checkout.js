import React from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";
import { deleteIndex } from "../../actions";

const Checkout = (props) => {
    let total = 0

    const calculateCost = (combo) => {
        let x = 0
        if (combo === "Bowl") {
            x = 8.5
        } else if(combo === "Plate") {
            x = 9.5
        } else if (combo === "Bigger Plate") {
            x = 10.5
        }
        
        total += x;
        
        return(
            <div>${x.toFixed(2)}</div>
        )
    }

    const clearCart = () => {
        props.items.map((item, index) => {
            return props.deleteIndex(0);
        })
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
                            {calculateCost(item.combo)}
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
                        <div className='two wide column'>${total.toFixed(2)}</div>
                    </div>
                    <div className='ui bottom attached segment'>
                        <div class='fluid ui buttons'>
                            <button class='ui positive button'>
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
    };
};
export default connect(mapStateToProps, {
    deleteIndex: deleteIndex
})(Checkout);
