import react from "react";
import sides from "../../apis/sides";
import CustomerPage from "./CustomerPage";
import {connect} from 'react-redux'
import { setPage } from "../../actions";

const SidePage = (props) => {
    const onCardClick = (index) => {
        props.setPage("Combo Page")
    }
    return <CustomerPage onCardClick= {onCardClick} card_list={sides} />;
};

const mapStateToProps = (state) => {
    return{
        page: state.page
    }
}
export default connect(mapStateToProps, {
    setPage: setPage
})(SidePage)