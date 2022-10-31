const express   = require('express');
const app       = express();

app.use(express.json());

// ex: http://localhost:4000/test-connection
app.get('/test-connection', (req, res, next) => { 
    res.send("hi");
});

// ex: http://localhost:4000/say-name/Walker
app.get('/say-name/:name', (req, res, next) => {
    const {name} = req.params;
    res.send("hi " + name);
});






app.listen(4000, function () {
    console.log('Server is running on port 4000');
});