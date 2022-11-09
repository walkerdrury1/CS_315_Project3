const express   = require('express');
const app       = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors);

const PORT = process.env.PORT || 4000;

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

/*
// ex: http://localhost:4000/say-name/Walker
app.get('/say-name/:name', (req, res, next) => {
    const {name} = req.params;
    res.send("hi " + name);
});*/

app.get('/get-users', async (req, res, next) => {
    try{
        const a = await pool.query("SELECT * FROM users");
        res.json(a.rows);
    } catch (err) {
        res.send(err.message);
    }
} );

//////////////////// GET REQUESTS
app.get('/get-menuitems', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.get('/get-entrees', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items WHERE type = 'entree'");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.get('/get-sides', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items WHERE type = 'side'");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.get('/get-extras', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items WHERE type = 'extra'");
        console.log(data.rows[0]);
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.get('/get-inventory', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM inventory");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});







//////////////////// POST REQUESTS


app.post('/process-transaction', async(req, res) => {
    try{
        const data = await pool.query("SELECT MAX(transactionid) FROM transactions;");
        res.json(data.rows);
        const transactionid = data.rows[0].max + 1;
        await pool.query(`INSERT INTO TRANSACTIONS VALUES (${transactionid}, CURRENT_DATE, ${req.body.cost}); `);
        const items = req.body.items;
        const data1 = await pool.query("SELECT MAX(indexid) FROM TRANSACTIONITEMS;")
        var transactionItemId = data1.rows[0].max + 1;
        console.log(`next transactionItem id = ${transactionItemId}`);
        for (var i = 0; i < items.length; i++) {
            console.log(`INSERT INTO TRANSACTIONITEMS VALUES (${transactionItemId}, ${transactionid}, ${items[i].id});`);
            await pool.query(`INSERT INTO TRANSACTIONITEMS VALUES (${transactionItemId}, ${transactionid}, ${items[i].id});`);
            transactionItemId += 1;
        }
    } catch(err) {

        console.log(err.message);
        res.send(err.message);
    }
});


app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});