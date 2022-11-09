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
        case "CART_DELETE":
            const comboIndex = action.payload.comboIndex
            const itemIndex = action.payload.itemIndex
            state.map((combo, index) => {
                if(index === comboIndex){
                    const to_change = []
                    combo.items.map((item,index) => {
                        if(index !== itemIndex){
                            to_change.push(item)
                        }
                    })
                    combo.items = to_change
                }
            })
            const to_return  = [...state]
            return to_return

        default:
            return state
    }
};

export default itemReducer;
