import React from "react";
import { connect } from "react-redux";
import { setPage } from "../actions";
const ManagerTopbar = (props) => {
    const topbar_item_list = ["Inventory", "Items", "Reports"];

    const goHome = () => {
        window.location.assign("/");
    };

    const click = (item) => {
        if (item === "Inventory") {
            props.setPage("Inventory Page");
        } else if (item === "Items") {
            props.setPage("Items Page");
        } else if (item === "Reports") {
            props.setPage("Reports");
        }
    };
    const displayTopbarItems = () => {
        return topbar_item_list.map((item) => {
            return (
                <div className='topbar-item' onClick={() => click(item)}>
                    {item}
                </div>
            );
        });
    };
    return (
        <div className='topbar-container'>
            <div className='topbar-logo-container'>
                <img
                    className='topbar-logo'
                    src='mike.png'
                    alt='panda logo'
                    onClick={() => goHome()}
                />
            </div>
            <div className='gui-view'>
                <h4>Manager View</h4>
            </div>
            <div className='topbar-items-container'>{displayTopbarItems()}</div>

            <div className='to-center'>
                <div className='sign-in'>
                    <i class='big user circle icon'></i>
                    <div className='to-center' onClick={() => props.setPage("landing page")}>Sign Out</div>
                </div>
            </div>
        </div>
    );
};

const mapStateProps = (state) => {
    return {
        page: state.page,
    };
};

export default connect(mapStateProps, {
    setPage: setPage,
})(ManagerTopbar);
