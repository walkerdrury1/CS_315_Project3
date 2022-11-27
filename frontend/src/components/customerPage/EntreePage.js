import React, { useEffect, useState } from "react";
import entrees from "../../apis/entrees";
import { connect } from "react-redux";
import { setCombo, setPage } from "../../actions";
import ItemCard from "../ItemCard";
import Topbar from "../Topbar";
import sides from "../../apis/sides";
import { addItem, concatList } from "../../actions";
import axios from "axios";

const EntreePage = (props) => {
    const [entreeItems, setEntreeItems] = useState([]);
    const [sideItems, setSideItems] = useState([]);

    const [sidesMax, setSidesMax] = useState(0);
    const [entreeMax, setEntreeMax] = useState(0);

    const [allEntrees, setAllEntrees] = useState([]);
    const [allSides, setAllSides] = useState([]);

    const [highlightNum, changeHighlight] = useState(-1);
    const [incFlag, changeFlag] = useState(1);
    let valid_entrees = 0;
    let valid_sides = 0;

    const callApis = async () => {
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-entrees"
        );
        const y = await axios.get(
            "https://tyson-express.onrender.com/get-sides"
        );
        setAllEntrees(x.data);
        setAllSides(y.data);
    };

    useEffect(() => {
        callApis();
    }, []);
    console.log(allEntrees);
    const submit = (name) => {
        if (name === "previous") {
            props.setPage("Combo Page");
            props.setCombo(null);
        }
        if (sidesMax !== 0 || entreeMax !== 0) {
            return;
        }
        const new_list = [];
        entreeItems.forEach((item) => {
            new_list.push(item);
        });
        sideItems.forEach((item) => {
            new_list.push(item);
        });
        const to_return = {
            combo: props.combo,
            items: new_list,
        };
        props.addItem(to_return);
        props.setPage("Checkout");
        props.setCombo(null);
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
                // item

                if (incFlag === 1) {
                    incrementerArrs[highlightNum].click()
                }
                else {
                    decrementArrs[highlightNum].click()
                }

                if (highlightNum < valid_entrees) {
                    const curr = parseInt(incNos[highlightNum].innerHTML, 10)

                    if (entreeMax == 0) changeFlag(0)
                    if (curr == 0) changeFlag(1)

                }

                else {
                    // in sides
                    const curr = parseInt(incNos[highlightNum].innerHTML, 10)

                    if (sidesMax == 0) changeFlag(0)
                    if (curr == 0) changeFlag(1)
                }

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
        if (props.combo === "Bowl") {
            setEntreeMax(1);
            setSidesMax(1);
        } else if (props.combo === "Plate") {
            setEntreeMax(2);
            setSidesMax(1);
        } else if (props.combo === "Bigger Plate") {
            setEntreeMax(3);
            setSidesMax(1);
        } else {
            setEntreeMax(100);
            setSidesMax(100);
        }
    }, []);
    console.log(props.items);

    const displayCard = (card_list, type) => {
        if (card_list.length === 0) {
            return (
                <div className='ui segment'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>loading...</div>
                    </div>
                </div>
            );
        }
        return card_list.map((card) => {
            const setMaxandItems = (amount, inc) => {
                if (type === "entree") {
                    setEntreeMax(amount);
                    const new_list = [...entreeItems];
                    if (inc) {
                        new_list.push(card);
                        setEntreeItems(new_list);
                    }
                    else{
                        const to_return = []
                        let index_to_remove = true
                        entreeItems.map((item) => {
                            if(card.name !== item.name || index_to_remove === false){
                                to_return.push(item)
                            }
                            else{
                                index_to_remove = false
                            }
                        })
                        setEntreeItems(to_return)
                    }
                } else {
                    setSidesMax(amount);
                    const new_list = [...sideItems];
                    
                    if (inc) {
                        new_list.push(card);
                        setSideItems(new_list);
                    }
                    else{
                        const to_return = []
                        let index_to_remove = true
                        sideItems.map((item) => {
                            if(card.name !== item.name || index_to_remove === false){
                                to_return.push(item)
                            }
                            else{
                                index_to_remove = false
                            }
                        })
                        setSideItems(to_return)
                    }
                }
            };
            if (card.onmenu === "yes") {
                if (type === "entree") valid_entrees++
                else valid_sides++
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={card}
                            type={type}
                            max={type === "entree" ? entreeMax : sidesMax}
                            setMax={(amount, inc) =>
                                setMaxandItems(amount, inc)
                            }
                        />
                    </div>
                );
            }
        });
    };
    if (allEntrees.length === 0) {
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
                <h1>Select {entreeMax} more Entrees</h1>
            </div>
            <div className='mainpage-card-container'>
                {displayCard(allEntrees, "entree", entreeMax)}
            </div>
            <div className='to-center'>
                <h1>Select {sidesMax} more Sides</h1>
            </div>
            <div className='mainpage-card-container'>
                {displayCard(allSides, "sides", sidesMax)}
            </div>
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
        page: state.page,
        combo: state.combo,
        items: state.items,
    };
};
export default connect(mapStateToProps, {
    setPage: setPage,
    setCombo: setCombo,
    addItem: addItem,
    concatList: concatList,
})(EntreePage);
