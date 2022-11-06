const comboReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_COMBO":
            return action.payload;
        default:
            return state;
    }
};

export default comboReducer;
