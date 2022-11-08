import ComboPage from './components/customerPage/ComboPage'
import { connect } from 'react-redux'
import { setPage } from './actions'
import SidePage from './components/customerPage/SidePage'
import EntreePage from './components/customerPage/EntreePage'
import Checkout from './components/checkout/Checkout'



const App = (props) =>{ 
    if(props.page === "Combo Page"){
        return <ComboPage />
    }
    else if(props.page === "Checkout"){
        return <Checkout />
    }
    else{
        return <EntreePage />
    }
}

const mapStateToProps = (state) => {
    return{
        page: state.page,
        combo: state.combo
    }
}
export default connect(mapStateToProps, {
    setPage: setPage
})(App)