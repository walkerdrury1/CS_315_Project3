import React, { useState, useEffect } from "react";
import ManagerTopbar from "./ManagerTopbar";
import "./InventoryPage.css";
import axios from "axios";
import Popup from "./Popup";

const InventoryPage = () => {
    const [list, setList] = useState([]);
    const [waiting, setWaiting] = useState(false);

    const inventoryItems = async () => {
        setWaiting(true);
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-inventory"
        );
        setList(x.data);
        setWaiting(false);
        return x.data;
    };
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        inventoryItems();
    }, [refresh]);

    const [popup, setPopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [title, setTitle] = useState(null);
    const [amount, setAmount] = useState("");

    const isNum = (word) => {
        if (word.length === 0) {
            setAmount("");
        } else if (isNaN(word)) {
            return;
        } else {
            setAmount(word);
        }

        return;
    };

    const reset = () => {
        setPopup(false);
        setActiveIndex(null);
        setTitle(null);
        setAmount("");
    };
    const submit = async (type) => {
        setWaiting(true);
        if (title.includes("Batch")) {
            await axios.post("https://tyson-express.onrender.com/add-batch", {
                name: list[activeIndex].itemname,
                expDate: new Date(),
                amt: amount,
            });
        }
        else{
            await axios.post("https://tyson-express.onrender.com/change-minimumamount", {
                name: list[activeIndex].itemname,
                minimumamount: amount
            });
        }

        setRefresh(!refresh);
        reset();
    };
    const popUp = () => {
        if (popup) {
            return (
                <Popup setPopup={setPopup}>
                    <h2 className='to-center'>{title}</h2>
                    <div className='to-center'>
                        <div className='ui input'>
                            <input
                                type='text'
                                Placeholder='Amount'
                                value={amount}
                                onChange={(e) => isNum(e.target.value)}
                            />
                        </div>
                    </div>

                    <br />
                    <div className='to-center'>
                        <button className='ui red button' onClick={reset}>
                            Cancel
                        </button>
                        <button className='ui red button' onClick={submit}>
                            Submit
                        </button>
                    </div>
                </Popup>
            );
        }
    };
    //add ingredients
    //add chicken/batch
    const capitalize = (word) => {
        const words = word.split(" ");
        let to_return = "";
        for (let i = 0; i < words.length; i++) {
            if (i === word.length - 1) {
                to_return +=
                    words[i].charAt(0).toUpperCase() + words[i].slice(1);
            } else {
                to_return +=
                    words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
            }
        }
        return to_return;
    };

    const displayIngredients = () => {
        if (list.length === 0) {
            return;
        }
        return list.map((ingredient, index) => {
            return (
                <tr>
                    <td>
                        <div className='to-center'>
                            {capitalize(ingredient.itemname)}
                        </div>
                    </td>
                    <td>
                        <div className='to-center'>
                            {ingredient.totalquantity}
                        </div>
                    </td>
                    <td>
                        <div className='to-center'>
                            {ingredient.minimumamount}
                        </div>
                    </td>
                    <td>
                        <div className='to-center'>
                            <div className='padding'>
                                <button
                                    className='my-button ui button'
                                    onClick={() => {
                                        setPopup(true);
                                        setActiveIndex(index);
                                        setTitle(
                                            `Add a Batch for ${capitalize(
                                                ingredient.itemname
                                            )}`
                                        );
                                    }}
                                >
                                    Add Batch
                                </button>
                            </div>
                            <div className='padding'>
                                <button
                                    className='my-button ui red button'
                                    onClick={() => {
                                        setPopup(true);
                                        setActiveIndex(index);
                                        setTitle(
                                            `Update Minimum amount for ${capitalize(
                                                ingredient.itemname
                                            )}`
                                        );
                                    }}
                                >
                                    Update Minimum Amount
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
    };
    if (waiting) {
        return (
            <div className='ui active dimmer'>
                <div className='ui text loader'>Loading...</div>
            </div>
        );
    } else {
        return (
            <div>
                {popUp()}
                <ManagerTopbar />
                <br />
                <h1 className='to-center'>Inventory</h1>
                <br />
                <br />
                <table class='ui celled table'>
                    <thead>
                        <tr>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Name</div>
                            </th>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Amount</div>
                            </th>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Minimum Amount</div>
                            </th>
                            <th className='five wide'>
                                {" "}
                                <div className='to-center'>
                                    Update Inventory
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{displayIngredients()}</tbody>
                </table>

                <br />
            </div>
        );
    }
};

export default InventoryPage;
