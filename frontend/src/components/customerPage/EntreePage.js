import React from 'react'
import CustomerPage from './CustomerPage'
import entrees from '../../apis/entrees'
import {connect} from 'react-redux'
import { setPage } from '../../actions'


const EntreePage = (props) => {
    const onCardClick = (index) => {
        console.log("clicked")
        props.setPage("Side Page")
        
    }
    return(
        <CustomerPage header = "Select your Entrees" onCardClick = {onCardClick} card_list={entrees} />
    )
}

const mapStateToProps = (state) => {
    
    return{
        page: state.page
    }
}
export default connect(mapStateToProps, {
    setPage: setPage
})(EntreePage)

