const pageReducer = (state = "a la carte page", action) => {
    switch(action.type){
        case "SET_PAGE":
            return action.payload
        default:
            return state
    }
}


export default pageReducer