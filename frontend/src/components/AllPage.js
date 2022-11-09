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
        callApi();
    }, []);

    console.log(selectedItems);
    const displayItems = () => {
        return allItems.map((item) => {
            const setMaxandItems = (amount) => {
                const new_list = [...selectedItems];
                new_list.push(item);
                setSelectedItems(new_list);
            };
            if (item.type !== "combo" && item.onmenu === "yes") {
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={item}
                            setMax={(e) => setMaxandItems(e)}
                        />
                    </div>
                );
            }
        });
    };

    return (
        <div>
            <Topbar />
            <br />
            <div className='to-center'>
                <h1>Select Items</h1>
            </div>
            <div className='mainpage-card-container'>{displayItems()}</div>
            <div className='to-center'>
                <button
                    className='ui button'
                    onClick={() => submit("previous")}
                >
                    Previous
                </button>
                <button
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
