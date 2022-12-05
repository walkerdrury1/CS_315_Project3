import React, { useEffect, useState } from "react";
import Topbar from "../Topbar";
import { connect } from "react-redux";
import axios from "axios";
import { calculateTotal, setPage } from "../../actions";
import { deleteIndex } from "../../actions";
import { setCombo } from "../../actions";
import { deleteCartItem } from "../../actions";
import "./checkout.css"

const Checkout = (props) => {

    const [highlightNum, changeHighlight] = useState(-1);
    const [active, setActive] = useState(false);

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

    useEffect(() => {
        const handleKey = (event) => {
        if (event.keyCode === 13) {
            // enter
            
            if (highlightNum === -1)
                return;
            
            event.preventDefault();
            const singleCancels = Array.from(document.querySelectorAll('.ui.red.button'))
            const orderMore = document.querySelector('.ui.fluid.blue.button')
            const completeOrder = document.querySelector('.ui.positive.button')
            const clearCart = document.querySelector('.ui.negative.button')
            switch(highlightNum) {
                case singleCancels.length:
                    orderMore.click()
                    break
                case singleCancels.length+1:
                    completeOrder.click()
                    break
                case singleCancels.length+2:
                    clearCart.click()
                    changeHighlight(2)
                    break
                default:
                    singleCancels[highlightNum].click()
                    changeHighlight(highlightNum-1)
            }
        }
        else if (event.keyCode === 9) {
            // tab
                event.preventDefault();
                const singleCancels = Array.from(document.querySelectorAll('.ui.red.button'))
                const orderMore = document.querySelector('.ui.fluid.blue.button')
                const completeOrder = document.querySelector('.ui.positive.button')
                const clearCart = document.querySelector('.ui.negative.button')
                const ll = singleCancels.length
                if (highlightNum !== -1) {

                    switch(highlightNum) {
                        case ll-1:
                            singleCancels[highlightNum].style.opacity = "1"
                            orderMore.style.opacity = "0.5"
                            orderMore.scrollIntoView({behavior: 'smooth'})
                            changeHighlight(highlightNum+1)
                            return
                        
                        case ll:
                            orderMore.style.opacity = "1"
                            completeOrder.style.opacity = "0.5"
                            completeOrder.scrollIntoView({behavior: 'smooth'})
                            changeHighlight(highlightNum+1)
                            return
                        
                        case ll+1:
                            completeOrder.style.opacity = "1"
                            clearCart.style.opacity = "0.5"
                            clearCart.scrollIntoView({behavior: 'smooth'})
                            changeHighlight(highlightNum+1)
                            return
                        case ll+2:
                            clearCart.style.opacity = "1"
                            if (ll == 0) {
                                orderMore.style.opacity = "0.5"
                                orderMore.scrollIntoView({behavior: 'smooth'})
                                changeHighlight(0)
                                return
                            }
                            singleCancels[0].style.opacity = "0.5"
                            singleCancels[0].scrollIntoView({behavior: 'smooth'})
                            changeHighlight(0)
                            return
                        default:
                            singleCancels[highlightNum].style.opacity = "1"
                            
                            
                    }

                }
                
                if (ll == 0) {
                    orderMore.style.opacity = "0.5"
                    orderMore.scrollIntoView({behavior: 'smooth'})
                    changeHighlight(0)
                    return
                }
                singleCancels[highlightNum+1].style.opacity = "0.5"
                singleCancels[highlightNum+1].scrollIntoView({behavior: 'smooth'})
                changeHighlight(highlightNum+1)
        }
    }
    window.addEventListener('keydown', handleKey);

    return () => {
        window.removeEventListener('keydown', handleKey);
    };
    
    
    },)

    useEffect(() => {
        setTimeout(() => {
            setActive(!active)
        }, 6000)
    }, [active])

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
                    return <li value='-'>{list_item.name.replace(
                        /(^\w{1})|(\s+\w{1})/g,
                        (letter) => letter.toUpperCase()
                    )}</li>;
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
                        <div className='left floated thirteen wide column'><h2>Total:</h2></div>
                        <div className='right floated three wide column'><h2>${props.total.toFixed(2)}</h2></div>
                    </div>
                    <div className='ui attached segment'>
                        <div className={active ? 'checkout-button-active' : 'checkout-button'}>
                        <button className="ui fluid blue button" onClick={() => props.setPage("Combo Page")}>
                            Order More
                        </button>
                        </div>
                    </div>
                    <div className='ui attached segment'>
                        <div className={active ? 'checkout-button-active' : 'checkout-button'}>
                            <div className='fluid ui buttons'>
                                <button
                                    className='ui positive button'
                                    onClick={
                                        processTransactions
                                    }
                                >
                                    Complete Order
                                </button>
                                <div className='or'></div>
                                <button
                                    className='ui negative button'
                                    tabIndex={0}
                                    onClick={() => clearCart()}
                                >
                                    Clear Cart
                                </button>
                            </div>
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
