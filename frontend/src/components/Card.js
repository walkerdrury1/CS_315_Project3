import React from 'react'
import './Card.css'

const Card = ({title, img, onCardClick, active}) => {
    const displayComponents = () => {
        let numEntree = 0;
        let numSide = 0;

        if (title === "Bowl") {
            numEntree = 1
            numSide = 1
        } else if (title === "Plate") {
            numEntree = 2
            numSide = 1
        } else if (title === "Bigger Plate") {
            numEntree = 3
            numSide = 2
        }

        return (
            <div>
                <div className='to-center'>
                    <h5 className='menu-components'>{numEntree} entree{(numEntree > 1) ? "s" : ""} & {numSide} side{(numSide > 1) ? "s" : ""}</h5>
                </div>
            </div>
        )
    }

    return(
        <div className={active ? 'card-container-active' : 'card-container'} onClick = {onCardClick}>
            <button>
            <div className='card-img-container'>
                <img className =  "card-img" src = {img} alt = {title}/>
            </div>
            <div className='card-components'>
                <div className='to-center'>
                    <h3 className="card-title">{title}</h3>
                </div>
                <div className='to-center'>
                    {(title === "A La Carte") ? "" : displayComponents()}
                </div>
            </div>
            </button>
        </div>
    )
}

export default Card