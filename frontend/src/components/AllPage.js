import React from "react";
import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import items from "../apis/items";
import ItemCard from "./ItemCard";
import axios from "axios";
import { connect } from "react-redux";
import { setCombo } from "../actions";
import { setPage } from "../actions";
import { addItem } from "../actions";

const AllPage = (props) => {
    const [allItems, setAllItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);


    const [highlightNum, changeHighlight] = useState(-1);
    const [incFlag, changeFlag] = useState(1);

    const callApi = async () => {
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        return;
    };

    const submit = (type) => {
        if (type === "submit") {
            const x = {
                combo: "A La Carte",
                items: selectedItems,
            };
            props.addItem(x);
        }
        props.setCombo(null);
        props.setPage("Checkout");
    };

    useEffect(() => {
        const handleKey = (event) => {
        if (event.keyCode === 13) {
            // enter
            
            if (highlightNum === -1)
                return;
            
            event.preventDefault();
            const incrementerArrs = Array.from(document.querySelectorAll('.increment'))
            const decrementArrs = Array.from(document.querySelectorAll('.decrement'))
            const incNos = Array.from(document.querySelectorAll('.incrementer-container h4'))
            const total = incrementerArrs.length

            if (highlightNum === total) {
                // previous
                submit("previous")
            }
            else if (highlightNum === total+1) {
                // add to cart
                submit("submit")
            }
            else {
                // when to decrease??
                const itemLimit = 5
                
                
                if (incFlag === 1)
                    incrementerArrs[highlightNum].click()
                else
                    decrementArrs[highlightNum].click()
                
                const curr = parseInt(incNos[highlightNum].innerHTML, 10)
                
                if (curr === 0) changeFlag(1)
                else if (curr === itemLimit) changeFlag(0)

            }
            
        }
        else if (event.keyCode === 9) {
            // tab
                event.preventDefault();
                const incrementerArrs = Array.from(document.querySelectorAll('.incrementer-container'))
                const cardImgs = Array.from(document.querySelectorAll('.card-img'))
                const prev = document.querySelector('#prev')
                const all = document.querySelector('#add')
                const total = incrementerArrs.length

                if (highlightNum !== -1) {

                    if (highlightNum === total - 1) {
                        incrementerArrs[highlightNum].style.color = "black"
                        prev.style.color = "red"
                        prev.scrollIntoView({behavior: 'smooth'})
                        changeHighlight(highlightNum+1)
                        return
                    }

                    else if (highlightNum < total)
                        incrementerArrs[highlightNum].style.color = "black"
                        
                    else if (highlightNum === total) {
                        prev.style.color = "black";
                        all.style.color = "red";
                        all.scrollIntoView({behavior: 'smooth'})
                        changeHighlight(highlightNum+1);
                        return;
                    }
                    else {
                        all.style.color = "black";
                        incrementerArrs[0].style.color = "red";
                        cardImgs[0].scrollIntoView({behavior: 'smooth'})
                        changeHighlight(0);
                        return;
                    }
                }

                incrementerArrs[highlightNum + 1].style.color = "red"
                cardImgs[highlightNum + 1].scrollIntoView({behavior: 'smooth'})
                changeHighlight(highlightNum+1);

        }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
        window.removeEventListener('keydown', handleKey);
    };
    
    
    },)

    useEffect(() => {
        callApi();
    }, []);

    console.log(selectedItems);
    const displayItems = (type) => {
        return allItems.map((item) => {
            const setMaxandItems = (amount, inc) => {
                const new_list = [...selectedItems];
                if (inc) {
                    new_list.push(item);
                    setSelectedItems(new_list);
                } else {
                    const to_return = [];
                    let index_to_remove = true;
                    selectedItems.map((card) => {
                        if (
                            item.name !== card.name ||
                            index_to_remove === false
                        ) {
                            to_return.push(card);
                        } else {
                            index_to_remove = false;
                        }
                    });
                    setSelectedItems(to_return);
                }
            };
            
            if (item.type === type && item.onmenu === "yes" && !item.name.includes("drink")) {
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={item}
                            setMax={(e, x) => setMaxandItems(e, x)}
                        />
                    </div>
                );
            } else if (item.type === "extra" && type === "drink" && item.name.includes("drink")) {
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={item}
                            setMax={(e, x) => setMaxandItems(e, x)}
                        />
                    </div>
                );
            }
        });
    };

    if (allItems.length === 0) {
        return (
            <div>
                <Topbar />
                <div className='ui active dimmer'>
                    <div className='ui text loader'>loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Topbar />
            <br />
            <div className='to-center'>
                <h1>Entrees</h1>
            </div>
            <div className='mainpage-card-container'>{displayItems("entree")}</div>
            <div className="to-center">
                <h1>Sides</h1>
            </div>
            <div className='mainpage-card-container'>{displayItems("side")}</div>
            <div className="to-center">
                <h1>Extras</h1>
            </div>
            <div className='mainpage-card-container'>{displayItems("extra")}</div>
            <div className="to-center">
                <h1>Drinks</h1>
            </div>
            <div className='mainpage-card-container'>{displayItems("drink")}</div>
            <div className='to-center'>
                <button
                    id = 'prev'
                    className='ui button'
                    onClick={() => submit("previous")}
                >
                    Previous
                </button>
                <button
                    id = 'add'
                    className='red ui button'
                    onClick={() => submit("submit")}
                >
                    Add to Cart
                </button>
            </div>
            <br />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        items: items,
    };
};

export default connect(mapStateToProps, {
    addItem: addItem,
    setCombo: setCombo,
    setPage: setPage,
})(AllPage);
