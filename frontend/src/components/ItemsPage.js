import React from "react";
import ManagerTopbar from "./ManagerTopbar";
import "./ItemsPage.css";
import ToggleSwitch from "./ToggleSwitch";

const ItemsPage = (props) => {
    const list = [
        { 
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
        {
            name: "orange chicken",
            cost: 8.20,
            ingredients: ["orange sauce", "chicken"],
            type: "entree"
        },
    ];

    const displayItems = () => {
        return list.map((item) => {
            const ingredientsList = item.ingredients.map((ingredient) => {
                return <li value='-'>{ingredient.replace(
                    /(^\w{1})|(\s+\w{1})/g,
                    (letter) => letter.toUpperCase()
                )}</li>;
            });
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
                                        {ingredientsList}
                                    </ol>
                                </h5>
                            </div>
                            <div className="to-center">
                                {" "}
                                <h5>
                                    ${item.cost.toFixed(2)}
                                    <button class="circular ui mini icon button">
                                        <i class="icon settings"></i>
                                    </button>
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
                                {" "}
                                <ToggleSwitch />
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            );
        });
    };

    return (
        <div>
            <ManagerTopbar />
            <br />
            <h1 className='to-center'>Inventory</h1>
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
                    <div className='to-center'>
                        <h3>On Menu</h3>
                    </div>
                </div>
            </div>

            <br />
            <div className='items'>{displayItems()}</div>
        </div>
    );
};

export default ItemsPage;
