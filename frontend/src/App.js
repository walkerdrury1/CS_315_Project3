import ComboPage from "./components/customerPage/ComboPage";
import { connect } from "react-redux";
import { setPage } from "./actions";
import SidePage from "./components/customerPage/SidePage";
import EntreePage from "./components/customerPage/EntreePage";
import Checkout from "./components/checkout/Checkout";
import LandingPage from "./components/LandingPage";
import AllPage from "./components/AllPage";
import Confirmation from "./components/checkout/Confirmation";
import SignInPage from "./components/SignInPage";
import ManagerPage from "./components/ManagerPage";
import InventoryPage from "./components/InventoryPage";
import ItemsPage from "./components/ItemsPage";

const App = (props) => {
    if (props.page === "Combo Page") {
        return <ComboPage />;
    } else if (props.page === "Checkout") {
        return <Checkout />;
    } else if (props.page === "landing page") {
        return <LandingPage />;
    } else if (props.page === "a la carte page") {
        return <AllPage />;
    } else if (props.page === "Confirmation") {
        return <Confirmation />;
    } 
    else if(props.page === "Sign in page"){
        return <SignInPage />
    }
    else if(props.page === "Manager Page"){
        return <ManagerPage />
    }
    else if(props.page === "Inventory Page"){
        return <InventoryPage />
    } else if (props.page === "Items Page") {
        return <ItemsPage />
    } else {
        return <EntreePage />;
    }
};

const mapStateToProps = (state) => {
    return {
        page: state.page,
        combo: state.combo,
    };
};
export default connect(mapStateToProps, {
    setPage: setPage,
})(App);
