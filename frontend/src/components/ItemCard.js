import React from "react";
import "./Card.css";
import Incrementer from "./Incrementer";

const ItemCard = ({ title, onCardClick, type, max, setMax, setItems, item}) => {
    console.log(item)
    let img = item.name + ".png"
    img = img.replace(/\s/g, "");
    
    return (
        <div className='cardItem-container' onClick={onCardClick}>
            <div className='card-img-container'>
                <img className='card-img' src={img} alt='pic of card' />
            </div>
            <div className='to-center'>
                <h3 className='card-title'>{item.name}</h3>
            </div>
            <div className="to-center">
                <Incrementer type = {item.type} max = {max} setMax = {setMax} />
            </div>
            <br/>
        </div>
    );
};

export default ItemCard;
