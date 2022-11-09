import React, { useState } from "react";
import "./Incrementer.css";
import { connect } from "react-redux";

const Incrementer = ({ type, max, setMax }) => {
    const [count, setCount] = useState(0);

    const change_count = (_type) => {
        if (_type === "i") {
            if (max !== 0) {
                setCount(count + 1);
                setMax(max - 1, true);
            }
        } else {
            if (count !== 0) {
                setCount(count - 1);
                setMax(max + 1, false);
            }
        }
    };

    return (
        <div className='incrementer-container'>
            <div className='decrement' onClick={() => change_count("d")}>
                -
            </div>
            <div className='to-center'>
                <h4>{count}</h4>
            </div>
            <div className='increment' onClick={() => change_count("i")}>
                +
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        entreeCount: state.entreeCount,
        sideCount: state.sideCount,
    };
};

export default connect(mapStateToProps)(Incrementer);
