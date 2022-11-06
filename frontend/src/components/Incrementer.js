import React, { useState } from 'react'
import './Incrementer.css'

const Incrementer = ({max}) => {
    const [count, setCount] = useState(0)
    
    const change_count = (type) => {
        if(type === "i"){
            if(count !== max){
                setCount(count + 1)
            }
        }
        else{
            if(count !== 0){
                setCount(count - 1)
            }
        }
    }

    return(
        <div className='incrementer-container'>
            <div className='decrement' onClick={() => change_count("d")}>
                -
            </div>
            <div className='to-center'>
                <h4>{count}</h4>
            </div>
            <div className='increment' onClick={() => change_count("i")}>
                +
            </div>

        </div>
    )
}
export default Incrementer