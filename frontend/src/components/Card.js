import React from 'react'
import './Card.css'

const Card = ({title, picture}) => {
    return(
        <div className='ui container card-container'>
            <div className='card-img-container'>
                <img className =  "card-img" src = {picture}/>
            </div>
            <div>
                <h3>{title}</h3>
            </div>
        </div>
    )
}

export default Card