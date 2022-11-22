import React, { useEffect, useState }, { useState } from "react";
import { connect } from "react-redux";
import { setPage, setSideCount } from "../actions";
import ServerCard from "./ServerCard";
import ServerCheckout from "./ServerCheckout";
import "./ServerPage.css";
import axios from "axios";

const ServerPage = (props) => {
    const [myPage, setMyPage] = useState("Combo Page");
    const comboList = ["Bowl", "Plate", "Bigger Plate", "A La Carte"];
    const [entreeCount, setEntreeCount] = useState(0);
    const [sideCount, setSideCount] = useState(0);
    const [entreeList, setEntreeList] = useState([]);
    const [sideList, setSideList] = useState([]);
    const [allList, setAllList] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [myPage2, setMyPage2] = useState(null);
    const [currItem, setCurrItem] = useState(null);

    const callApi = async () => {
        setWaiting(true);
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-menuitems"
        );
        setAllList(x.data);
        console.log(x.data);
        setWaiting(false);
    };
    useEffect(() => {
        callApi();
    }, []);
    console.log(transactionList, "transaction list")
    console.log(currItem, "currItem")
    const comboClick = (combo) => {
        setMyPage(combo + " Page");
        if (combo === "Bowl") {
            setEntreeCount(1);
            setSideCount(1);
            setMyPage2("Entree");
            setCurrItem({ type: "Bowl", items: [] });
        } else if (combo === "Plate") {
            setEntreeCount(2);
            setSideCount(1);
            setMyPage2("Entree");
            setCurrItem({ type: "Plate", items: [] });
        } else if (combo === "Bigger Plate") {
            setEntreeCount(3);
            setSideCount(1);
            setMyPage2("Entree");
            setCurrItem({ type: "Bigger Plate", items: [] });
        } else {
            setEntreeCount(1);
            setEntreeCount(1);
            setMyPage2("All");
        }
    };

    const sideClick = (side) => {
        if (sideCount === 0) {
            return;
        } else {
            if (sideCount - 1 === 0) {
                setMyPage2(null);
                setMyPage("Combo Page");
                setSideCount(sideCount - 1);
                currItem.items.push(side);
                const temp2 = [];
                for (let i = 0; i < transactionList.length; i++) {
                    temp2.push(transactionList[i]);
                }
                temp2.push(currItem);
                setTransactionList(temp2);
                setCurrItem(null)
            } else {
                setSideCount(sideCount - 1);
                const temp = currItem;
                temp.items.push(side);
            }
        }
    };

    const entreeClick = (entree) => {
        if (entreeCount === 0) {
            return;
        } else {
            if (entreeCount - 1 === 0) {
                setMyPage2(null);
            }
            setEntreeCount(entreeCount - 1);
            currItem.items.push(entree);
        }
    };

    const allClick = (item) => {
        setMyPage2(null);
        setMyPage("Combo Page");
        const temp2 = [];
        for (let i = 0; i < transactionList.length; i++) {
            temp2.push(transactionList[i]);
        }
        temp2.push(item);
        setTransactionList(temp2);
    };
    const reset = () => {
        setEntreeCount(0);
        setSideCount(0);
        setMyPage("Combo Page");
        setMyPage2(null);
    };

    const displayCombos = () => {
        return comboList.map((combo) => {
            return (
                <div className='eight wide column'>
                    <ServerCard
                        onClick={() => comboClick(combo)}
                        title={combo}
                    />
                </div>
            );
        });
    };

    const displayEntrees = () => {
        if (allList.length === 0) {
            return (
                <div className='loading-container'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>loading...</div>
                    </div>
                </div>
            );
        }
        return allList.map((entree, index) => {
            if (entree.type === "entree" && entree.onmenu === "yes") {
                return (
                    <div key={index} className='eight wide column'>
                        <ServerCard
                            onClick={() => entreeClick(entree)}
                            title={entree.name}
                        />
                    </div>
                );
            } else {
                return null;
            }
        });
    };

    const displaySides = () => {
        if (allList.length === 0) {
            return (
                <div className='loading-container'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>loading...</div>
                    </div>
                </div>
            );
        }
        return allList.map((side, index) => {
            if (side.type === "side" && side.onmenu === "yes") {
                return (
                    <div key={index} className='eight wide column'>
                        <ServerCard
                            onClick={() => sideClick(side)}
                            title={side.name}
                        />
                    </div>
                );
            } else {
                return null;
            }
        });
    };

    const displayAll = () => {
        if (allList.length === 0) {
            return (
                <div className='loading-container'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>loading...</div>
                    </div>
                </div>
            );
        }
        return allList.map((item, index) => {
            if (item.onmenu === "yes") {
                return (
                    <div key={index} className='eight wide column'>
                        <ServerCard
                            onClick={() => allClick(item)}
                            title={item.name}
                        />
                    </div>
                );
            } else {
                return null;
            }
        });
    };
    const route = () => {
        if (myPage === "Combo Page") {
            return (
                <div className='to-center'>
                    {" "}
                    <div className='ui grid'>{displayCombos()}</div>
                </div>
            );
        } else if (
            myPage === "Bowl Page" ||
            myPage === "Plate Page" ||
            myPage === "Bigger Plate Page"
        ) {
            return (
                <div>
                    <h3 className='to-center'>
                        Select {myPage2 === "Entree" ? entreeCount : sideCount}{" "}
                        more {myPage2 === "Entree" ? "entrees" : "sides"}
                    </h3>

                    <div className='to-center'>
                        <div className='ui grid'>
                            {myPage2 === "Entree"
                                ? displayEntrees()
                                : displaySides()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h3 className='to-center'>Select an Item</h3>

                    <div className='to-center'>
                        <div className='ui grid'>{displayAll()}</div>
                    </div>
                </div>
            );
        }
    };
    if (waiting) {
        return (
            <div className='ui active dimmer'>
                <div className='ui text loader'>loading...</div>
            </div>
        );
    }
    return (
        
        <div className='ui grid'>
            <div className='twelve wide column'>{route()}</div>
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
