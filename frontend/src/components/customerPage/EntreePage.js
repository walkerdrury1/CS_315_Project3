import React, { useEffect, useState } from "react";
import entrees from "../../apis/entrees";
import { connect } from "react-redux";
import { setCombo, setPage } from "../../actions";
import ItemCard from "../ItemCard";
import Topbar from "../Topbar";
import sides from "../../apis/sides";
import { addItem, concatList } from "../../actions";
import axios from "axios";

const EntreePage = (props) => {
    const [entreeItems, setEntreeItems] = useState([]);
    const [sideItems, setSideItems] = useState([]);

    const [sidesMax, setSidesMax] = useState(0);
    const [entreeMax, setEntreeMax] = useState(0);

    const [allEntrees, setAllEntrees] = useState([]);
    const [allSides, setAllSides] = useState([]);

    const callApis = async () => {
        const x = await axios.get(
            "https://tyson-express.onrender.com/get-entrees"
        );
        const y = await axios.get(
            "https://tyson-express.onrender.com/get-sides"
        );
        setAllEntrees(x.data);
        setAllSides(y.data);
    };

    useEffect(() => {
        callApis();
    }, []);
    console.log(allEntrees);
    const submit = (name) => {
        if (name === "previous") {
            props.setPage("Combo Page");
            props.setCombo(null);
        }
        if (sidesMax !== 0 || entreeMax !== 0) {
            return;
        }
        const new_list = [];
        entreeItems.forEach((item) => {
            new_list.push(item);
        });
        sideItems.forEach((item) => {
            new_list.push(item);
        });
        const to_return = {
            combo: props.combo,
            items: new_list,
        };
        props.addItem(to_return);
        props.setPage("Checkout");
        props.setCombo(null);
    };
    useEffect(() => {
        if (props.combo === "Bowl") {
            setEntreeMax(1);
            setSidesMax(1);
        } else if (props.combo === "Plate") {
            setEntreeMax(2);
            setSidesMax(1);
        } else if (props.combo === "Bigger Plate") {
            setEntreeMax(3);
            setSidesMax(1);
        } else {
            setEntreeMax(100);
            setSidesMax(100);
        }
    }, []);
    console.log(props.items);

    const displayCard = (card_list, type) => {
        if (card_list.length === 0) {
            return (
                <div className='ui segment'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>loading...</div>
                    </div>
                </div>
            );
        }
        return card_list.map((card) => {
            const setMaxandItems = (amount) => {
                if (type === "entree") {
                    setEntreeMax(amount);
                    const new_list = [...entreeItems];
                    new_list.push(card);
                    setEntreeItems(new_list);
                } else {
                    setSidesMax(amount);
                    const new_list = [...sideItems];
                    new_list.push(card);
                    setSideItems(new_list);
                }
            };
            if (card.onmenu === "yes") {
                return (
                    <div className='card-grid-container'>
                        <ItemCard
                            item={card}
                            type={type}
                            max={type === "entree" ? entreeMax : sidesMax}
                            setMax={(amount) => setMaxandItems(amount)}
                        />
                    </div>
                );
            }
        });
    };
    if (allEntrees.length === 0) {
        return (
            <div>
                <Topbar />
                <div className='ui active dimmer'>
                    <div className='ui text loader'>loading...</div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Topbar />
            <br />
            <div className='to-center'>
                <h1>Select {entreeMax} more Entrees</h1>
            </div>
            <div className='mainpage-card-container'>
                {displayCard(allEntrees, "entree", entreeMax)}
            </div>
            <div className='to-center'>
                <h1>Select {sidesMax} more Sides</h1>
            </div>
            <div className='mainpage-card-container'>
                {displayCard(allSides, "sides", sidesMax)}
            </div>
            <div className='to-center'>
                <button
                    className='ui button'
                    onClick={() => submit("previous")}
                >
                    Previous
                </button>
                <button
                    className='red ui button'
                    onClick={() => submit("submit")}
                >
                    Add to Cart
                </button>
            </div>
            <br />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        page: state.page,
        combo: state.combo,
        items: state.items,
    };
};
export default connect(mapStateToProps, {
    setPage: setPage,
    setCombo: setCombo,
    addItem: addItem,
    concatList: concatList,
})(EntreePage);
