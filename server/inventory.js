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

/**
 * @swagger
 * /get-inventory/:
 *   get:
 *     description: Retrieve list of inventory items from the database
 *     responses: 
 *       '200':
 *         description: A JSON array of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *           
 *  
 */
router.get('/get-inventory', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM inventory");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /add-batch/:
 *   post:
 *     description: Add a new batch of a current inventory item to the database
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               expDate:
 *                 type: string
 *               amt:
 *                 type: integer
 *             example: {name: Orange Chicken, expDate: 01-01-23, amt:100}
 *         
 *     responses: 
 *       '200':
 *         description: Completed
 */
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
       res.send('success');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /add-inventory/:
 *   post:
 *     description: Add a new inventory item to the database
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *         
 *     responses: 
 *       '200':
 *         description: Completed
 */
router.post('/add-inventory' ,async(req,res) => {
    try{
        //console.log(req.body);
        const data = await pool.query('SELECT MAX(itemid) FROM inventory');
        const itemid = data.rows[0].max +1;
        //console.log(itemid);
        // let minimumamount;
        // minimumamount ??= 100;
        // req.body.minimumamount ? minimumamount = req.body.minimumamount : minimumamount = 100; 
        // console.log(minimumamount);
        await pool.query(`INSERT INTO inventory VALUES(${itemid}, '${req.body.name}', 0, ${req.body.minimumamount ? req.body.minimumamount : 100});`);
        res.send('success');
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /change-minimumamount/:
 *   post:
 *     description: Change the minimumamount attribute of an ingredient
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               minimumamount:
 *                 type: integer
 *         
 *     responses: 
 *       '200':
 *         description: Completed
 */
router.post('/change-minimumamount', async (req, res) => {
    try{
        await pool.query(`UPDATE inventory set minimumamount = ${req.body.minimumamount} WHERE itemname = '${req.body.name}';`);
        res.send('success');
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

module.exports = router