import React from "react";
import ManagerTopbar from "./ManagerTopbar";
import "./ItemsPage.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Popup from "./Popup";

const ItemsPage = () => {
    const [error, setError] = useState(false);
    const [popup, setPopup] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const newItemCost = useRef("");
    const newItemName = useRef("");
    const newItemType = useRef("");
    const newItemIngredientsString = useRef("");
    const [newItemIngredientsList, setNewItemIngredientsList] = useState([]);

    const callApi = async () => {
        setWaiting(true)
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        setWaiting(false)
        return;
    };


    const removeItem = async (itemname) => {
        setWaiting(true)
        const res = await axios.post("https://tyson-express.onrender.com/remove-item", {name: itemname});
        setRefresh(!refresh);
        console.log(res)
    };

    // const restoreItems = () => {
    //     setWaiting(true)
    //     allItems.map(async (item) => {
    //         if (item.onmenu === "no"){ 
    //             await axios.post("https://tyson-express.onrender.com/toggle-item", {name: item.name});
    //         }
    //     }
    //     )
    //     setRefresh(!refresh)
    // }

    const reset = () => {
        setPopup(false);
        newItemCost.current.valueOf = "";
        newItemName.current.valueOf = "";
        newItemType.current.valueOf = "";
        newItemIngredientsString.current.valueOf = "";
    };

    const addItem =  async () => {
        let found = false;
        console.log("Checking if ", newItemName.current.value, " already exists");
        allItems.map(async (item) => {
            if (item.name === newItemName.current.value) {
                console.log(newItemName.current.value, " already exists, changing price to ", newItemCost.current.value, " and type to ", newItemType.current.value);
                if (item.onmenu === "no") {
                    await axios.post("https://tyson-express.onrender.com/toggle-item", {name: item.name});
                }
                await axios.post("https://tyson-express.onrender.com/set-price", {name: item.name, cost: newItemCost.current.value});
                await axios.post("https://tyson-express.onrender.com/change-type", {name: item.name, type: newItemType.current.value});
                await axios.post("https://tyson-express.onrender.com/change-type", {name: item.name, ingredients: newItemIngredientsList});
                found = true;
                return;
            }
        })

        if (!found) {
            await axios.post("https://tyson-express.onrender.com/add-item", {name: newItemName, cost: newItemCost, type:newItemType, ingredients:newItemIngredientsList});
        }
    }

    const getItemInfo = async () => {
        if (newItemCost.current.value === "" 
            || newItemName.current.value === "" 
            || newItemType.current.value === "" 
            || newItemIngredientsString.current.value === "") {
            setError(true);
            return;
        }
        setError(false);
        setWaiting(true);
        setNewItemIngredientsList(newItemIngredientsString.current.value.split(','));
        
        newItemIngredientsList.forEach(function(part, index) {
            this[index] = part.trim();
        }, newItemIngredientsList);

        console.log(newItemIngredientsList);

        addItem(newItemName);

        console.log("Name: ", newItemName.current.value, " Cost: ", newItemCost.current.value, " Type: ", newItemType.current.value);
        setRefresh(!refresh);
        setPopup(false);
    }

    const displayError = () => {
        if (error) {
            return (
                <div className='to-center'>
                    <div className='error-message'>
                        *Missing Required Information
                    </div>
                </div>
            );
            
        } else {
            return <br />;
        }
    };

    const popUp = (type, index, ingredient) => {
        if (popup) {
            return (
                <Popup setPopup={setPopup}>
                    <h2 className='to-center'>New Item Information</h2>
                    <form className="ui form">
                <div className="three fields">
                    <div className="field">
                        <label>Item Name</label>
                        <input type="text" 
                            placeholder="Enter Item Name" 
                            ref={newItemName} 
                            onChange={() => setError(false)}>
                        </input>
                    </div>
                    <div className="field">
                        <label>Cost</label>
                        <input type="number" 
                            placeholder="Enter Item Cost" 
                            ref={newItemCost} 
                            onChange={(e) => setError(false)}>
                        </input>
                    </div>
                    <div className="field">
                        <label>Item Type</label>
                        <select className="ui fluid dropdown" ref={newItemType} onChange={() => setError(false)}>
                            <option value="">Select Item Type</option>
                            <option value="entree">Entree</option>
                            <option value="side">Side</option>
                            <option value="extra">Extra</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label>Ingredients</label>
                    <textarea placeholder="Enter ingredients as a comma-separated list (i.e. beef, broccoli, beef and broccoli sauce)" ref={newItemIngredientsString} onChange={() => setError(false)}></textarea>
                </div>
            </form>
            <br />
            <div className='to-center'>
                        <button className='ui red button' onClick={reset}>
                            Cancel
                        </button>
                        <button className='ui green button' onClick={() => getItemInfo()}>Submit</button>
                    </div>
                    <br />
                    <div>{displayError()}</div>
                </Popup>
            );
        }
    };

    useEffect(() => {
        callApi();
    }, [refresh]);

    const displayItems = () => {
        return allItems.map((item) => {
            if (item.type !== "combo" && item.onmenu === "yes") {
                // const ingredientsList = item.ingredients.map((ingredient) => {
                //     return <li value='-'>
                //             {ingredient.replace(
                //             /(^\w{1})|(\s+\w{1})/g,
                //             (letter) => letter.toUpperCase()
                //             )}
                //         </li>;
                //     });
                return (
                    <div>
                        <div className='to-center'>
                            <div className='items-grid'>
                                <div className='to-center'>
                                    {" "}
                                    <h5>{item.name.replace(
                                        /(^\w{1})|(\s+\w{1})/g,
                                        (letter) => letter.toUpperCase()
                                        )}
                                    </h5>
                                </div>
                                <div className='to-center'>
                                    {" "}
                                    <h5>
                                        <ol class="ui list">
                                            candy
                                        </ol>
                                    </h5>
                                </div>
                                <div className="to-center">
                                    {" "}    
                                    <h5>
                                        ${item.cost.toFixed(2)}
                                    </h5>
                                </div>
                                <div className="to-center">
                                    {" "}
                                    <h5>
                                        {item.type.replace(
                                        /(^\w{1})|(\s+\w{1})/g,
                                        (letter) => letter.toUpperCase()
                                        )}
                                    </h5>
                                </div>
                                <div className='to-center'>
                                    <button class="ui blue button">
                                        Change Price
                                    </button>
                                    <button className="negative ui button" onClick={() => removeItem(item.name)}>
                                        X
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                );
            } else {
                return <div></div>
            }
        });
    };

    if(waiting){
        return(
            <div className="ui active dimmer">
                <div className="ui text loader">loading...</div>
            </div>
        )
    }

    return (
        <div>
            {popUp()}
            <ManagerTopbar />
            <br />
            <h1 className='to-center'>Menu Items</h1>
            <br />
            <br />
            <div className='to-center'>
                <div className='items-grid'>
                    <div className='to-center'>
                        <h3>Name</h3>
                    </div>
                    <div className='to-center'>
                        <h3>Ingredients</h3>
                    </div>
                    <div className="to-center">
                        <h3>Price</h3>
                    </div>
                    <div className="to-center">
                        <h3>Type</h3>
                    </div>
                    <div className="to-center">
                        <button 
                            className="ui positive button" 
                            onClick={() => {setPopup(true);}}
                            >Add New Item</button>
                    </div>
                </div>
            </div>

            <br />
            <div className='items'>{displayItems()}</div>
        </div>
    );
};

export default ItemsPage;
