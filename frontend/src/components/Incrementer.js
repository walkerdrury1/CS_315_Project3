import React, { useState, useEffect } from "react";
import "./Incrementer.css";
import { connect } from "react-redux";

const Incrementer = ({ type, max, setMax, active, setActive }) => {
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
        <div
            className={
                active
                    ? "incrementer-container-active "
                    : "incrementer-container"
            }
        >
            <button
                className='decrement'
                onClick={() => {
                    change_count("d");
                    setActive(false);
                }}
            >
                -
            </button>
            <div className='to-center'>
                <h4>{count}</h4>
            </div>
            <button
                className='increment'
                onClick={() => {
                    change_count("i");
                    setActive(false);
                }}
            >
                <div className='plus'>+</div>
            </button>
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
