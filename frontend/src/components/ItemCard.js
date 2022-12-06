import React from "react";
import "./Card.css";
import Incrementer from "./Incrementer";
import { connect } from "react-redux";

const ItemCard = ({
    title,
    onCardClick,
    type,
    max,
    setMax,
    setItems,
    item,
    combo,
    active,
    setActive
}) => {
    let img = item.name + ".png";
    img = img.replace(/\s/g, "");

    const displayName = () => {
        return <h3>{item.name.replace(
            /(^\w{1})|(\s+\w{1})/g,
            (letter) => letter.toUpperCase()
            )}</h3>;
    };
    const displayCost = () => {
        if (combo === "A La Carte") {
            return (
                <div className='to-center'>
                    <h3> ${item.cost.toFixed(2)}</h3>
                    <br />
                    <br />
                </div>
            );
        }
    };
    return (
        <div className='cardItem-container' onClick={onCardClick}>
            <div className='card-img-container'>
                <img className='card-img' src={img} alt={item.name} />
            </div>
            <div className="to-center">{displayName()}</div>
            <br/>

            {displayCost()}
            <div className='to-center'>
                <Incrementer type={item.type} max={max} setMax={setMax} active = {active} setActive = {setActive}/>
            </div>
            <br />
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        combo: state.combo,
    };
};
export default connect(mapStateToProps)(ItemCard);
