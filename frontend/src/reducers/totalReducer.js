const totalReducer = (state = 0, action) => {
    switch (action.type) {
        case "CALCULATE_COST":
            const list = action.payload;
            let x = 0;
            for (let i = 0; i < list.length; i++) {
                let combo = list[i];
                console.log(combo.combo)
                if (combo.combo === "Plate") {
                    x += 9;
                }
                if (combo.combo === "Bigger Plate") {
                    x += 10.5;
                }
                if (combo.combo === "Bowl") {
                    x += 7.5;
                } else {
                    for (let j = 0; j < combo.items.length; j++) {
                        let item = combo.items[j];
                        x += item.cost;
                    }
                }
            }
            return x;

        default:
            return state;
    }
};

export default totalReducer;
