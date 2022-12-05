import React from 'react'
import './Card.css'

const Card = ({title, img, onCardClick, active}) => {
    return(
        <div className={active ? 'card-container-active' : 'card-container'} onClick = {onCardClick}>
            <div className='card-img-container'>
                <img className =  "card-img" src = {img} alt = {title}/>
            </div>
            
            <div className='to-center'>
                <h3 className='card-title'>{title}</h3>
            </div>
        </div>
    )
}

export default Card