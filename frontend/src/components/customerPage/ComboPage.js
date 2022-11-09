import React from "react";
import combos from "../../apis/combos";
import { connect } from "react-redux";
import { setPage } from "../../actions";
import { setCombo } from "../../actions";
import Topbar from "../Topbar";
import Card from "../Card";
import { setEntreeCount, setSideCount } from "../../actions";

const ComboPage = (props) => {

    const onCardClick = (combo_name) => {
        props.setCombo(combo_name)
        props.setPage("Select Items Page")
    }

    const displayCard = () => {
        return combos.map((card, index) => {
            return (
                <div className='card-grid-container'>
                    <Card
                        onCardClick={() => onCardClick(card.name)}
                        title={card.name}
                        img={card.img}
                    />
                </div>
            );
        });
    };

    return (
        <div>
            <Topbar />
            <br />
            <div className='to-center'>
                <h1>Select a Combo</h1>
            </div>
            <div className='mainpage-card-container'>{displayCard()}</div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        page: state.page,
        combo: state.combo,
        entreeCount: state.entreeCount,
    };
};
export default connect(mapStateToProps, {
    setPage: setPage,
    setCombo: setCombo,
    setEntreeCount: setEntreeCount,
    setSideCount: setSideCount
})(ComboPage);
