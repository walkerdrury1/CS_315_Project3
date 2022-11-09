const itemReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_ITEM":
            const new_list = [...state]
            new_list.append(action.payload)
            return new_list
        case "CONCAT_LIST":
            const concat_list = []
            state.forEach(item => {
                concat_list.push(item)
            })
            action.payload.forEach((item)=>{
                concat_list.push(item)
            })
            return concat_list
        default:
            return state
    }
};

export default itemReducer;
