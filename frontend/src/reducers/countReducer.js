const entreeCountReducer = (state = 2, action) => {
    switch(action){
        case "SET_ENTREE_COUNT":
            return action.payload
        default:
            return state
    }

}

export default entreeCountReducer

