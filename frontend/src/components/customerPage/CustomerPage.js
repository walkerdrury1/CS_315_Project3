import React from "react";
import Topbar from "../Topbar";
import Card from "../Card";
import './CustomerPage.css'

const CustomerPage = ({card_list, onCardClick}) => {
    const displayCard = () => {
        return card_list.map((card,index) => {
            return <div className="card-grid-container"><Card onCardClick = {onCardClick} title={card.name} img={card.img} /></div>;
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
