import React from "react";
import Topbar from "../Topbar";
import Card from "../Card";

const CustomerPage = () => {
    const card_list = [
        {
            name: "entrees",
            picture: "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg"
        }
    ]
    const displayCard = () => {
        return card_list.map(card_list => {
            return(
                <Card title = {card_list.name} picture = {card_list.picture} />
            )
        })
    }
    return (
        <div>
            <Topbar />
            {displayCard()}
        </div>
    );
};

export default CustomerPage;