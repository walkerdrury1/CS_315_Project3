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
    const [ingredients, setIngredients] = useState({});
    let newItemIngredientsList = [];
    let found = false;

    const callApi = async () => {
        setWaiting(true)
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllItems(x.data);
        const y = {}
        for(let i = 0; i < x.data.length; i++){
            let item = x.data[i]
            const temp_ingredients = await axios.get("https://tyson-express.onrender.com/get-ingredients/" + item.name)
            y[item.name] = temp_ingredients.data
        }
        setIngredients(y)
        setWaiting(false)
    };

    const getIngredients = async () => {
        while(true){
            if(allItems.length === 0){
                break
            }
        }
        const x = {}
        for(let i = 0; i < allItems.length; i++){
            let item = allItems[i]
            const temp_ingredients = await axios.get("https://tyson-express.onrender.com/get-ingredients/" + item.name)
            x[item.name] = temp_ingredients.data
        }
        setIngredients(x)
    }
    useEffect(() => {
        setWaiting(true)
        callApi();
        //getIngredients();
        setWaiting(false)
    }, [refresh]);



    const removeItem = async (itemname) => {
        setWaiting(true)
        await axios.post("https://tyson-express.onrender.com/remove-item", {name: itemname});
        setRefresh(!refresh);
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
        found = false;
        setNewItemCost("");
        setNewItemName("");
        setNewItemType("");
        setNewItemIngredientsString("");
        newItemIngredientsList = [];
    };

    const addOldItem = async () => {
        await axios.post("https://tyson-express.onrender.com/remove-item", {name: newItemName});
        await axios.post("https://tyson-express.onrender.com/toggle-item", {name: newItemName});  
        await axios.post("https://tyson-express.onrender.com/set-price", {name: newItemName, price: newItemCost});
        await axios.post("https://tyson-express.onrender.com/change-type", {name: newItemName, type: newItemType});
        await axios.post("https://tyson-express.onrender.com/change-ingredients", {name: newItemName, ingredients: newItemIngredientsList});
    }

    const addNewItem = async () => {
        console.log(newItemName, " ", newItemCost, " ", newItemType, " ", newItemIngredientsList)
        let result = await axios.post("https://tyson-express.onrender.com/add-item", {name: newItemName, cost: newItemCost, type: newItemType, ingredients: newItemIngredientsList});
        console.log(result);
    }

    const changePrice = async () => {
        if (newItemCost === "") {
            setError(true)
            return
        }

        setError(false);
        setWaiting(true);

        let result = await axios.post("https://tyson-express.onrender.com/set-price", {name: title, price: newItemCost});

        setPopup2(false);
        reset();
        setRefresh(!refresh);
    }

    const checkForItem = async () => {
        setNewItemName(newItemName.toLowerCase());
        await allItems.map((item) => {
            if (item.name === newItemName.toLowerCase()) {
                found = true;
            }
            return;
        })


        if (found) {
            await addOldItem();
        } else {
            await addNewItem();
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
        newItemIngredientsList = newItemIngredientsString.split(',');
        
        newItemIngredientsList.forEach(function(part, index) {
            this[index] = part.trim().toLowerCase();
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
                        <button className='ui green button' onClick={async () =>  {await getItemInfo()}}>Submit</button>
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
        return allItems.map((item, index) => {
            if (item.type !== "combo" && item.onmenu === "yes") {
                const ingredientsList = ingredients[item.name].map((ingredient) => {
                    return <div className="to-center">
                            {ingredient.replace(
                            /(^\w{1})|(\s+\w{1})/g,
                            (letter) => letter.toUpperCase()
                            )}
                        </div>;
                    });

                return (
                    <tr>
                        <td>
                            <div className='to-center'>
                                {" "}
                                <h5>{item.name.replace(
                                    /(^\w{1})|(\s+\w{1})/g,
                                    (letter) => letter.toUpperCase()
                                    )}
                                </h5>
                            </div>
                        </td>
                        <td>
                            <div className="to-center"> 
                                {" "}
                                <h5>
                                    {ingredientsList}
                                </h5>
                            </div>
                        </td>
                        <td>
                            <div className="to-center">
                                {" "}    
                                <h5>
                                    ${item.cost.toFixed(2)}
                                </h5>
                            </div>
                        </td>
                        <td>
                            <div className="to-center">
                                {" "}
                                <h5>
                                    {item.type.replace(
                                    /(^\w{1})|(\s+\w{1})/g,
                                    (letter) => letter.toUpperCase()
                                    )}
                                </h5>
                            </div>
                        </td>
                        <td>
                            <div className='to-center'>
                                <button class="ui blue button" onClick={() => {setTitle(item.name); setPopup2(true);}}>
                                    Change Price
                                </button>
                                <button className="negative ui button" onClick={() => removeItem(item.name)}>
                                    X
                                </button>
                            </div>
                        </td>
                    </tr>
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
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th className='three wide'>
                            <h3 className="to-center">Name</h3>
                        </th>
                        <th className='three wide'>
                            <h3 className="to-center">Ingredients</h3>
                        </th>
                        <th className='three wide'>
                            <h3 className="to-center">Price</h3>
                        </th>
                        <th className='three wide'>
                            <h3 className="to-center">Type</h3>
                        </th>
                        <th className='three wide'>
                            <div className="to-center">
                                <button 
                                className="ui positive button" 
                                onClick={() => {setPopup(true);}}
                                >Add New Item</button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayItems()}
                </tbody>
            </table>
            
        </div>
    );
};

export default ItemsPage;
