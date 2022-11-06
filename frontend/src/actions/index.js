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