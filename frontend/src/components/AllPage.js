import React from "react";
import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import items from "../apis/items";
import ItemCard from "./ItemCard";
import axios from "axios";

const AllPage = () => {
    const [allItems, setAllItems] = useState([]);

    const callApi = async () => {
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        return;
    };

    useEffect(() => {
        callApi();
    }, []);

    const displayItems = () => {
        return allItems.map((item) => {
            if (item.type !== "combo" && item.onmenu === "yes") {
                return (
                    <div className='card-grid-container'>
                        <ItemCard item={item} />
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
                <button className='ui button' >Previous</button>
                <button className='red ui button'>Add to Cart</button>
            </div>
            <br />
        </div>
    );
};

export default AllPage;
