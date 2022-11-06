import React from 'react'
import combos from '../../apis/combos'
import CustomerPage from './CustomerPage'
import {connect} from 'react-redux'
import { setPage } from '../../actions'


const ComboPage = (props) => {
    const onCardClick = (index) => {
        console.log("clicked")
        props.setPage("Entree Page")
        
    }
    return(
        <div>
            <CustomerPage onCardClick= {onCardClick} card_list={combos} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        page: state.page
    }
}
export default connect(mapStateToProps, {
    setPage: setPage
})(ComboPage)