import React from "react";
import Topbar from "../Topbar";
import Card from "../Card";
import './CustomerPage.css'

const CustomerPage = () => {
    const card_list = [
        {
            name: "entrees",
            picture:
                "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg",
        },{
            name: "entrees",
            picture:
                "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg",
        },{
            name: "entrees",
            picture:
                "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg",
        },{
            name: "entrees",
            picture:
                "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg",
        },
    ];
    const displayCard = () => {
        return card_list.map((card_list) => {
            return <div className="card-grid-container"><Card title={card_list.name} picture={card_list.picture} /></div>;
        });
    };
    return (
        <div>
            <Topbar />
            <div className='mainpage-card-container'>{displayCard()}</div>
        </div>
    );
};

export default CustomerPage;
