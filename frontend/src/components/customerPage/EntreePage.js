import React from 'react'
import entrees from '../../apis/entrees'
import {connect} from 'react-redux'
import { setCombo, setPage } from '../../actions'
import ItemCard from '../ItemCard'
import Topbar from '../Topbar'
import { setEntreeCount } from '../../actions'
import sides from '../../apis/sides'


const EntreePage = (props) => {
    console.log(props)
    const submit = (name) => {
        props.setPage("Combo Page")
        props.setCombo(name)
        
    }
    const displayCard = (card_list, type) => {
        return card_list.map((card) => {
            return (
                <div className='card-grid-container'>
                    <ItemCard
                        title={card.name}
                        img={card.img}
                        type = {type}
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
                <h1>Select your Entrees</h1>
            </div>
            <div className='mainpage-card-container'>{displayCard(entrees, "entree")}</div>
            <div className="to-center">
                <h1>Select your Sides</h1>
            </div>
            <div className='mainpage-card-container'>{displayCard(sides, "sides")}</div>
            <div className='to-center'>
                <button className='ui button' onClick={() => submit("submit")}>Previous</button>
                <button className='red ui button' onClick={() => submit("previous")}>Add to Cart</button>
            </div>
            <br/>
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return{
        page: state.page,
        combo: state.combo,
        entreeCount: state.entreeCount,
        sideCount: state.sideCount
    }
}
export default connect(mapStateToProps, {
    setPage: setPage,
    setCombo: setCombo,
    setEntreeCount: setEntreeCount
})(EntreePage)

