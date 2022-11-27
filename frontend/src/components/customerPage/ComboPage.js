import React from "react";
import combos from "../../apis/combos";
import { connect } from "react-redux";
import { setPage } from "../../actions";
import { setCombo } from "../../actions";
import Topbar from "../Topbar";
import Card from "../Card";
import "./CustomerPage.css";
import {useState} from "react"
import { useEffect } from "react"
import { setEntreeCount, setSideCount } from "../../actions";

const ComboPage = (props) => {
    const [highlightNum, changeHighlight] = useState(-1)

    

    const onCardClick = (combo_name) => {
        props.setCombo(combo_name);

        if (combo_name === "A La Carte") {
            props.setPage("a la carte page");
            return;
        }
        props.setPage("Select Items Page");
    };

    useEffect(() => {
        const handleKey = (event) => {
        if (event.keyCode === 13) {
            // enter
            event.preventDefault();
            if (highlightNum !== -1)
                onCardClick(combos[highlightNum].name);
        }
        else if (event.keyCode === 9) {
            // tab

                event.preventDefault();
                const cardsArr = Array.from(document.querySelectorAll('.card-container'))
                console.log(cardsArr)
                if (highlightNum !== -1) {
                    cardsArr[highlightNum].style.opacity = "1.0";
                }
                const next = (highlightNum+1) % combos.length
                cardsArr[next].style.opacity = "0.5";
                cardsArr[next].scrollIntoView({behavior: 'smooth'})
                changeHighlight(next);
        }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
        window.removeEventListener('keydown', handleKey);
    };
    }, );





    console.log(props.combo)
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
                <h1>Make a Selection</h1>
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
    setSideCount: setSideCount,
})(ComboPage);
