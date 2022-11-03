import React from 'react'
import './Card.css'

const Card = ({title, picture}) => {
    return(
        <div className='card-container'>
            <div className='card-img-container'>
                <img className =  "card-img" src = {picture}/>
            </div>
            <div className='to-center'>
                <h3 className='card-title'>{title}</h3>
            </div>
        </div>
    )
}

export default Card