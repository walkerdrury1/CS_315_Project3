export const setPage = (to_set) => {
    return {
        type: "SET_PAGE",
        payload: to_set,
    };
};

export const setCombo = (to_set) => {
    setEntreeCount(100);
    return {
        type: "SET_COMBO",
        payload: to_set,
    };
};

export const setEntreeCount = (to_set) => {
    return {
        type: "SET_ENTREE_COUNT",
        payload: to_set,
    };
};

export const setSideCount = (to_set) => {
    return {
        type: "SET_SIDE_COUNT",
        payload: to_set,
    };
};

export const addItem = (item) => {
    return {
        type: "ADD_ITEM",
        payload: item,
    };
};

export const concatList = (list) => {
    return {
        type: "CONCAT_LIST",
        payload: list,
    };
};
export const deleteIndex = (index) => {
    return {
        type: "DELETE_ITEM_INDEX",
        payload: index,
    };
};

export const calculateTotal = (list) => {
    return{
        type: "CALCULATE_COST",
        payload: list
    }
}
