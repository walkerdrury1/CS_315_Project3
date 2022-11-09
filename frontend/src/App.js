import ComboPage from './components/customerPage/ComboPage'
import { connect } from 'react-redux'
import { setPage } from './actions'
import SidePage from './components/customerPage/SidePage'
import EntreePage from './components/customerPage/EntreePage'
import Checkout from './components/checkout/Checkout'
import LandingPage from './components/LandingPage';
import AllPage from './components/AllPage'


const App = (props) =>{     
    if(props.page === "Combo Page"){
        return <ComboPage />
    }
    else if(props.page === "Checkout"){
        return <Checkout />
    }
    else if(props.page === "landing page"){
        return <LandingPage />
    }
    else if(props.page === "a la carte page"){
        return <AllPage />
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