import React from "react";
import ManagerTopbar from "./ManagerTopbar";
import "./InventoryPage.css";

const InventoryPage = () => {
    const list = [
        { name: "chicken", amount: 3 },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
        {
            name: "orange sauce",
            amount: 4,
        },
    ];

    //add ingredients
    //add chicken/batch
    const displayIngredients = () => {
        return list.map((ingredient) => {
            return (
                <div>
                    <div className='to-center'>
                        <div className='inventory-grid'>
                            <div className='to-center'>
                                {" "}
                                <h5>{ingredient.name}</h5>
                            </div>
                            <div className='to-center'>
                                {" "}
                                <h5>{ingredient.amount}</h5>
                            </div>
                            <div className='to-center'>
                                {" "}
                                <div className='ui button'>
                                    Add {ingredient.name}
                                </div>
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
                <div className='inventory-grid'>
                    <div className='to-center'>
                        <h3>Name</h3>
                    </div>
                    <div className='to-center'>
                        <h3>Amount</h3>
                    </div>
                    <div className='to-center'>
                        <h3>Update amount</h3>
                    </div>
                </div>
            </div>

            <br />
            <div className='inventory'>{displayIngredients()}</div>
        </div>
    );
};

export default InventoryPage;
