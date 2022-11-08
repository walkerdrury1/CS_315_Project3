export const setPage = (to_set) => {
    return {
        type: "SET_PAGE",
        payload: to_set
    };
};

export const setCombo = (to_set) => {    
    return{
        type: "SET_COMBO",
        payload: to_set
    }
}

export const setEntreeCount = (to_set) => {
    console.log("in set entree count " + to_set)
    return{
        type: "SET_ENTREE_COUNT",
        payload: {
            count: 1
        }
    }
}

export const setSideCount = (to_set) => {
    return{
        type: "SET_SIDE_COUNT",
        payload: to_set
    }
}

