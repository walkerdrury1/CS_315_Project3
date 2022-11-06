import React from "react";
import Topbar from "../Topbar";
import Card from "../Card";
import "./CustomerPage.css";
import ItemCard from "../ItemCard";

const CustomerPage = ({ card_list, onCardClick, header}) => {
    const displayCard = () => {
        return card_list.map((card, index) => {
            return (
                <div className='card-grid-container'>
                    <ItemCard
                        //onCardClick={() => onCardClick(card.name)}
                        title={card.name}
                        img={card.img}
                    />
                </div>
            );
        });
    };
    return (
        <div>
            <Topbar />
            <br/>
            <div className="to-center">
                <h1>{header}</h1>
            </div>
            <div className='mainpage-card-container'>{displayCard()}</div>
        </div>
    );
};

export default CustomerPage;
