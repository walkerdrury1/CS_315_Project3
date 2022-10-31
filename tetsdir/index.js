const express   = require('express');
const app       = express();
const cors      = require("cors");
//const pool      = require("./db");

app.use(cors());
app.use(express.json()); //req.body

// send requests to http://localhost:4000/<extension>

// ex: http://localhost:4000/test-connection
app.get('/test-connection', (req, res, next) => { 
    res.send("hi");
});

// ex: http://localhost:4000/say-name/Walker
app.get('/say-name/:name', (req, res, next) => {
    const {name} = req.params;
    res.send("hi " + name);
});

// ex: http://localhost:4000/test-json
app.get('/test-json', (req, res, next) => {
    res.json( {
        name: 'Walker',
        class: 'Junior',
        sex: 'yes',
    });
});

app.listen(4000, function () {
    console.log('Server is running on port 4000');
});