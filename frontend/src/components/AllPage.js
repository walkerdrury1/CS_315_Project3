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
    const [active, setActive] = useState(false);


    const [highlightNum, changeHighlight] = useState(-1);
    const [incFlag, changeFlag] = useState(1);

    const callApi = async () => {
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        return;
    };

    useEffect(() => {
        setTimeout(() => {
            setActive(!active)
        }, 12000)
    }, [active])

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
                            active={active}
                            setActive={setActive}
                        />
                    </div>
                );
            } else if (item.type === "extra" && type === "drink" && item.name.includes("drink")) {
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={item}
                            setMax={(e, x) => setMaxandItems(e, x)}
                            active={active}
                            setActive={setActive}
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
                    className='ui massive button'
                    onClick={() => submit("previous")}
                >
                    Previous
                </button>
                <button
                    id = 'add'
                    className='ui positive massive button'
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
