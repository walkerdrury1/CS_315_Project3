import react, { useState } from "react";
import "./Topbar.css";
import { connect } from "react-redux";
import { setPage } from "../actions";

const Topbar = (props) => {
    const topbar_item_list = ["Order Now", "Locations", "Checkout"];
    const [active, setActive] = useState(null);

    const click = (item, index) => {
        if (item === "Order Now") {
            props.setPage("Combo Page");
        }
        if (item === "Checkout") {
            props.setPage(item);
            setIndex(index);
        } else if (item === "Sign in") {
            props.setPage("Sign in page");
        }
    };

    const goHome = () => {
        window.location.assign("/");
    };
    const setIndex = (index) => {
        setActive(index);
    };
    const displayTopbarItems = () => {
        return topbar_item_list.map((item, index) => {
            return (
                <div
                    className={`${
                        active === index ? "active-" : ""
                    }topbar-item`}
                    onClick={() => click(item, index)}
                >
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
                <h4>Customer View</h4>
            </div>
            <div className='topbar-items-container'>{displayTopbarItems()}</div>

            <div className='to-center'>
                <div className='sign-in'>
                    <i class='big user circle icon'></i>
                    <div className='to-center' onClick={() => click("Sign in")}>
                        Sign in
                    </div>
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
})(Topbar);
