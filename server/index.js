const express   = require('express');
const app       = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors);

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// ex: http://localhost:4000/test-connection
app.get('/test-connection', (req, res, next) => { 
    res.send("hi");
});

// ex: http://localhost:4000/say-name/Walker
app.get('/say-name/:name', (req, res, next) => {
    const {name} = req.params;
    res.send("hi " + name);
});

app.get('/get-users', async (req, res, next) => {
    try{
        const a = await pool.query("SELECT * FROM USERS");
        res.json(a.rows);
    } catch (err) {
        res.send(err.message);
    }
} );



app.listen(4000, function () {
    console.log('Server is running on port 4000');
});