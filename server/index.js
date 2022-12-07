const express   = require('express');
const app       = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

//DOCUMENTATTION
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tyson Express API',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

app.use('/docs', 
        swaggerUi.serve, 
        swaggerUi.setup(swaggerSpec, {explorer:true}));
////////////////////

/**
 * @swagger
 *   components:
 *     schemas:
 *       MenuItem:
 *         type: object
 *         required:
 *           - name
 *           - id
 *           - type
 *           - cost
 *         properties:
 *           name:
 *             type: string
 *             description: The name of the menu item
 *           type:
 *             type: string
 *             description: The type of menu item
 *           cost:
 *             type: number
 *             description: The cost of the menu item
 *         example:
 *           name: 'Orange Chicken'
 *           type: entree
 *           cost: 5.4
 * 
 *       Ingredient:
 *         type: object
 *         required:
 *           - name
 *           - id
 *           - type
 *           - cost
 *         properties:
 *           name:
 *             type: string
 *             description: The name of the menu item
 *           type:
 *             type: string
 *             description: The type of menu item
 *           cost:
 *             type: number
 *             description: The cost of the menu item
 *         example:
 *           name: 'Orange Chicken'
 *           type: entree
 *           cost: 5.4
 * 
 */

//////////////////// GET REQUESTS
/**
 * @swagger
 * /get-menuitems/:
 *   get:
 *     description: Retrieve list of menu items from the database
 *     responses: 
 *       '200':
 *         description: A JSON array of menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *           
 *  
 */
app.get('/get-menuitems', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /get-entrees/:
 *   get:
 *     description: Retrieve list of all entree type menu items from the database
 *     responses: 
 *       '200':
 *         description: A JSON array of menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *           
 *  
 */
app.get('/get-entrees', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items WHERE type = 'entree'");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /get-sides/:
 *   get:
 *     description: Retrieve list of all side type menu items from the database
 *     responses: 
 *       '200':
 *         description: A JSON array of menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *           
 *  
 */
app.get('/get-sides', async(req, res) => {
    try{
        const data = await pool.query("SELECT * FROM items WHERE type = 'side'");
        res.json(data.rows);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /get-extras/:
 *   get:
 *     description: Retrieve list of all extra type menu items from the database
 *     responses: 
 *       '200':
 *         description: A JSON array of menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *           
 *  
 */
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




//////////////////// POST REQUESTS

/**
 * @swagger
 * /process-transaction/:
 *   post:
 *     description: Send a transaction to the server and update database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cost: 
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses: 
 *       '200':
 *         description: Completed
 *           
 *  
 */
app.post('/process-transaction', async(req, res) => {
    try{
        const data = await pool.query("SELECT MAX(transactionid) FROM transactions;");
        const transactionid = data.rows[0].max + 1;
        await pool.query(`INSERT INTO TRANSACTIONS VALUES (${transactionid}, CURRENT_DATE, ${req.body.cost}); `);
        const items = req.body.items;
        const data1 = await pool.query("SELECT MAX(indexid) FROM TRANSACTIONITEMS;")
        var transactionItemId = data1.rows[0].max + 1;
       // console.log(`next transactionItem id = ${transactionItemId}`);
        for (var i = 0; i < items.length; i++) {
           // console.log(`INSERT INTO TRANSACTIONITEMS VALUES (${transactionItemId}, ${transactionid}, ${items[i].id});`);
            await pool.query(`INSERT INTO TRANSACTIONITEMS VALUES (${transactionItemId}, ${transactionid}, ${items[i].id});`);
            transactionItemId += 1;
        }

        const create_view = `CREATE OR REPLACE VIEW view1 AS SELECT transactionid, id, name FROM transactionitems NATURAL JOIN items WHERE transactionid=${transactionid};`;
        const ingIds = `select itemid from items NATURAL JOIN ingredientslist NATURAL JOIN inventory NATURAL JOIN view1;`
        await pool.query(create_view);
        const data2 = await pool.query(ingIds);
       // console.log(data2.rows);
        const data3 = data2.rows;
        var updateCommand;
        for (var i = 0; i < data3.length; i++) {
            updateCommand = `UPDATE inventory SET totalquantity = totalquantity -1 WHERE itemid=${data3[i].itemid};`
           // console.log(updateCommand);
            await pool.query(updateCommand);
        }
        res.send("completed");

``    } catch(err) {

        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /validate/:
 *   post:
 *     description: Validate credentials to log into app
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *             example: {username: hello, password: password}
 *     responses: 
 *       '200':
 *         description: Returns users role if found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 role:
 *                   type: string
 *               example: {role: manager}
 */
app.post('/validate', async(req, res) => {
    try{
    const username = req.body.username;
    const password = req.body.password;
    const sqlQuery = `SELECT * FROM users WHERE name='${username}' AND password='${password}';`
    const result = await pool.query(sqlQuery);
    if (result.rows == 0) {
        res.send({role : 'None'});
    }
    else{
        res.send({role : `${result.rows[0].role}`});
    }


    } catch(err) {

        console.log(err.message);
        res.send(err.message);
    }
});


const exampleRounter = require('./inventory')
app.use('/', exampleRounter)

const menuitemsRouter = require('./menuitems')
app.use('/', menuitemsRouter)

const reportRouter = require('./reports')
app.use('/', reportRouter)

const oauthRouter = require('./oauth')
app.use('/', oauthRouter)

app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});