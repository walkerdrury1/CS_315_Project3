import react, { useState } from "react";
import "./Topbar.css";

const Topbar = () => {
    const topbar_item_list = [
        "entrees",
        "sides",
        "checkout",
        "entrees",
        "sides",
    ];
    const [active, setActive] = useState(null);

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
                    onClick={() => setIndex(index)}
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
                    src='https://logos-world.net/wp-content/uploads/2022/02/Panda-Express-Logo.png'
                    alt='panda logo'
                    onClick={() => goHome()}
                />
            </div>
            <div className='to-center'>
                <h4>Customer view</h4>
            </div>
            <div className='topbar-items-container'>{displayTopbarItems()}</div>

            <div className='to-center'>
                <div className='sign-in'>
                    <i class='big user circle icon'></i>
                    <div className="to-center">Sign in</div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
