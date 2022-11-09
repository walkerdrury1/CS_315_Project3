const itemReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_ITEM":
            const new_list = [...state]
            new_list.push(action.payload)
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
        case "DELETE_ITEM_INDEX":
            const temp_list = []
            const indexx = action.payload
            state.forEach((item, index)=> {
                if(index !== indexx){
                    temp_list.push(item)
                } 
            })
            return temp_list;

        default:
            return state
    }
};

export default itemReducer;
