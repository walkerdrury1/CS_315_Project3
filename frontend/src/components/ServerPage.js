import React, { useState } from "react";
import { connect } from "react-redux";
import { setPage } from "../actions";
import ServerCard from "./ServerCard";
import ServerCheckout from "./ServerCheckout";
import "./ServerPage.css";

const ServerPage = (props) => {
    const cart = [
        {
            combo: "A La Carte",
            items: [
                {
                    name: "chicken",
                    cost: 8.2
                }
            ]
        },
        {
            combo: "Bowl",
            items: [
                {
                    name: "beef"
                },
                {
                    name: "chowmein"
                }
            ]
        }
    ]


    const comboList = ["Bowl", "Plate", "Bigger Plate", "A La Carte"];
    const displayCombos = () => {
        return comboList.map((combo) => {
            return <ServerCard className = "server-card" title={combo} />;
        });
    };
    return (
        
        <div className='ui grid'>
            <div className='twelve wide column'>
                <div className='ui grid'>{displayCombos()}</div>
            </div>
            <div className='four wide column'>
                <div className='server-signout'>
                    <div
                        className='to-center'
                        onClick={() => props.setPage("landing page")}
                    >
                        <button className='ui big red button'>Sign Out</button>
                    </div>
                </div>
                <div className="server-checkout">
                        <ServerCheckout items={{cart}}/>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        page: state.page,
    };
};
export default connect(mapStateToProps, {
    setPage: setPage,
})(ServerPage);
