import React from "react";
import "./Card.css";
import Incrementer from "./Incrementer";

const ItemCard = ({ title, img, onCardClick }) => {
    return (
        <div className='cardItem-container' onClick={onCardClick}>
            <div className='card-img-container'>
                <img className='card-img' src={img} alt='pic of card' />
            </div>
            <div className='to-center'>
                <h3 className='card-title'>{title}</h3>
            </div>
            <div className="to-center">
                <Incrementer max={2} />
            </div>
            <br/>
        </div>
    );
};

export default ItemCard;