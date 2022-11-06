import ComboPage from './components/customerPage/ComboPage'
import { connect } from 'react-redux'
import { setPage } from './actions'
import SidePage from './components/customerPage/SidePage'
import EntreePage from './components/customerPage/EntreePage'



const App = (props) =>{ 
    if(props.page === "Combo Page"){
        return <ComboPage />
    }
    else if(props.page === "Entree Page"){
        return <EntreePage />
    }
    else if(props.page === "Side Page"){
        return <SidePage />
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