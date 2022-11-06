import React from 'react'
import combos from '../../apis/combos'
import CustomerPage from './CustomerPage'
import {connect} from 'react-redux'
import { setPage } from '../../actions'
import {setCombo} from '../../actions'
import Incrementer from '../Incrementer';


const ComboPage = (props) => {
    console.log(props.combo)
    const onCardClick = (index) => {
        console.log("clicked")
        props.setCombo(index)
        props.setPage("Entree Page")
        
    }
    return(
        <div>
            <CustomerPage header = "Select a Combo" onCardClick= {onCardClick} card_list={combos} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        page: state.page,
        combo: state.combo
    }
}
export default connect(mapStateToProps, {
    setPage: setPage,
    setCombo: setCombo
})(ComboPage)