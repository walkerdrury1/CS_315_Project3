import React from "react";
import ManagerTopbar from "./ManagerTopbar";

const InventoryPage = () => {
    const list = [
        { name: "chicken", amount: 3 },
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
                <div className="inventory grid">
                    <div>{ingredient.name}</div>
                    <div>{ingredient.amount}</div>
                    <div className='ui button'>Add {ingredient.name}</div>
                </div>
            );
        });
    };

    return (
        <div>
            <ManagerTopbar />
            <br />
            <div className='to-center'>{displayIngredients()}</div>
            invenotry page
        </div>
    );
};

export default InventoryPage;
