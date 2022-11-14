
export const addItem = (app) => {
    app.get("/add-item", (req, res) =>{
        res.send("hi");
    });
};