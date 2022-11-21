import React from "react";
import ManagerTopbar from "./ManagerTopbar";
import "./ItemsPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";

const ItemsPage = () => {
    const [error, setError] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [title, setTitle] = useState("");
    const [newItemCost, setNewItemCost] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemType, setNewItemType] = useState("");
    const [newItemIngredientsString, setNewItemIngredientsString] = useState("");
    const [newItemIngredientsList, setNewItemIngredientsList] = useState([]);
    const [found, setFound] = useState(false);

    const callApi = async () => {
        setWaiting(true)
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        setWaiting(false)
        return;
    };

    useEffect(() => {
        callApi();
    }, [refresh]);



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
        setPopup2(false);
        setError(false);
        //setFound(false);
        setNewItemCost("");
        setNewItemName("");
        setNewItemType("");
        setNewItemIngredientsString("");
    };

    const addOldItem = async (item) => {
        let result;
        if (item.onmenu === "no") {
            result = await axios.post("https://tyson-express.onrender.com/toggle-item", {name: item.name});
            console.log("On menu: ", result);   
        }
        await axios.post("https://tyson-express.onrender.com/set-price", {name: item.name, price: newItemCost});
        result = await axios.post("https://tyson-express.onrender.com/change-type", {name: item.name, type: newItemType});
        console.log(result)
        await axios.post("https://tyson-express.onrender.com/change-type", {name: item.name, ingredients: newItemIngredientsList});
    }

    const addNewItem = async () => {
        let result = await axios.post("https://tyson-express.onrender.com/add-item", {name: newItemName, price: newItemCost, type: newItemType, ingredients: newItemIngredientsList});
        console.log(result);
    }

    const changePrice = async () => {
        if (newItemCost === "") {
            setError(true)
            return
        }

        setError(false);
        setWaiting(true);

        console.log("Changing price of ", title, " to ", Number(newItemCost));

        let result = await axios.post("https://tyson-express.onrender.com/set-price", {name: title, price: newItemCost});

        console.log(result);
        setPopup2(false);
        reset();
        setRefresh(!refresh);
    }

    const checkForItem = async () => {
        console.log("Checking if ", newItemName.toLowerCase(), " already exists");
        await allItems.map((item) => {
            if (item.name === newItemName.toLowerCase()) {
                setFound(true);
                addOldItem(item);
            }
            return;
        })

        if (!found) {
            console.log("in wrong function")
            addNewItem();
        }
    }
    const getItemInfo = async () => {
        if (newItemCost === "" 
            || newItemName === "" 
            || newItemType === "" 
            || newItemIngredientsString === "") {
            setError(true);
            return;
        }
        setError(false);
        setWaiting(true);
        setNewItemIngredientsList(newItemIngredientsString.split(','));
        
        newItemIngredientsList.forEach(function(part, index) {
            this[index] = part.trim();
        }, newItemIngredientsList);

        console.log(newItemIngredientsList);

        await checkForItem(newItemName);

        console.log("Name: ", newItemName, " Cost: ", newItemCost, " Type: ", newItemType);
        setRefresh(!refresh);
        reset();
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

    const popUp2 = () => {
        if (popup2) {
            return (
                <Popup setPopup={setPopup2}>
                    <h2 className='to-center'>Change price of {title.replace(
                                        /(^\w{1})|(\s+\w{1})/g,
                                        (letter) => letter.toUpperCase()
                                        )}</h2>
                    <div className="ui form">
                        <div className="field">
                            <label></label>
                            <input type="number" 
                                placeholder="Enter Item Cost"  
                                value={newItemCost}
                                onChange={(event) => {setError(false); setNewItemCost(event.target.value);}}>
                            </input>
                        </div>
                    </div>
                    <br />
            <div className='to-center'>
                        <button className='ui red button' onClick={reset}>
                            Cancel
                        </button>
                        <button className='ui green button' onClick={() => changePrice()}>Submit</button>
                    </div>
                    <div>{displayError()}</div>
                </Popup>
            );
        }
    }

    const popUp = () => {
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
                            value={newItemName} 
                            onChange={(event) => {setError(false); setNewItemName(event.target.value)}}>
                        </input>
                    </div>
                    <div className="field">
                        <label>Cost</label>
                        <input type="number" 
                            placeholder="Enter Item Cost" 
                            value={newItemCost}
                            onChange={(event) => {setError(false); setNewItemCost(event.target.value)}}>
                        </input>
                    </div>
                    <div className="field">
                        <label>Item Type</label>
                        <select className="ui fluid dropdown" value={newItemType} onChange={(event) => {setError(false); setNewItemType(event.target.value);}}>
                            <option value="">Select Item Type</option>
                            <option value="entree">Entree</option>
                            <option value="side">Side</option>
                            <option value="extra">Extra</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label>Ingredients</label>
                    <textarea placeholder="Enter ingredients as a comma-separated list (i.e. beef, broccoli, beef and broccoli sauce)" value={newItemIngredientsString} onChange={(event) => {setError(false); setNewItemIngredientsString(event.target.value)}}></textarea>
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
                                    <button class="ui blue button" onClick={() => {setTitle(item.name); setPopup2(true);}}>
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
            {popUp2()}
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
