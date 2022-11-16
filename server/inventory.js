const express = require('express')
const { Pool } = require('pg');
const router = express.Router()

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

router.get('/get-inventory', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

// Body requires : name, expDate, amt
router.post('/add-batch', async(req, res) => {
    try{
       //console.log(req.body);
       const data = await pool.query('SELECT MAX(batchid) FROM batch;');
       //console.log(data);
       const batchid = data.rows[0].max +1;
       const data2 = await pool.query(`SELECT itemid FROM inventory WHERE itemname = '${req.body.name}';`);
       const itemid = data2.rows[0].itemid;
       await pool.query(`INSERT INTO batch VALUES (${batchid}, '${req.body.expDate}', ${req.body.amt}, ${itemid});`);
       console.log("executed update");
       res.send(true);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

// itemid, itemname, totalquantity, minimumamount
// Body requires : name
// Body optional : minimumamount
router.post('/add-inventory' ,async(req,res) => {
    try{
        //console.log(req.body);
        const data = await pool.query('SELECT MAX(itemid) FROM inventory');
        const itemid = data.rows[0].max +1;
        //console.log(itemid);
        var minimumamount = 100;
        if(req.body.minimumamount){
            minimumamount = req.body.minimumamount;
        }
        await pool.query(`INSERT INTO inventory VALUES(${itemid}, '${req.body.name}', 0, ${minimumamount});`);
        res.send(true);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

module.exports = router