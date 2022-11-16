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
 * Description: Add a new item with possibly new ingredients to the database
 * Requires: name, type, cost, list of ingredients
 * Returns: 'success' or error message
 * EX: axois.post(url + '/add-item', {name: 'pumpkin pie', type:'entree', cost: 50, ingredients: ['pumpkin', 'pie']});
 */
router.post('/add-item', async(req, res) => {
    try {
        const ingredients = req.body.ingredients;
        const itemName = req.body.name;
        const itemType = req.body.type;
        const itemCost = req.body.cost;
        
        let data = await pool.query(`SELECT MAX(id) FROM items;`);
        const itemId = data.rows[0].max + 1;
        await pool.query(`INSERT INTO items VALUES (${itemId}, '${itemName}', '${itemType}', ${itemCost}, 'yes');`);
        let newIndexId = (await pool.query("SELECT MAX(indexid) from ingredientslist;")).rows[0].max + 1;
        let newIngId = (await pool.query("SELECT MAX(itemid) FROM inventory;")).rows[0].max + 1;
        
        for (let t = 0; t < ingredients.length; t++) {
            let ingredient = ingredients[t];
            data = (await pool.query(`SELECT * FROM inventory WHERE itemname='${ingredient}';`)).rows;
            if (data.length > 0) {
                // ingredient exists
                // itemid is ingId in sql server
                const ingId = data[0].itemid;
                await pool.query(`INSERT INTO ingredientslist VALUES (${newIndexId}, ${itemId}, ${ingId});`)
            } 
            else {   
                await pool.query(`INSERT INTO inventory VALUES (${newIngId}, '${ingredient}', 0, 100);`)
                await pool.query(`INSERT INTO ingredientslist VALUES (${newIndexId}, ${itemId}, ${newIngId});`)
                newIngId++;
            }
            newIndexId++
            
        }
        res.send('success');
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }

})

/**
 * Description: Change the price of an existing item in the database
 * Requires: name
 * Returns: 'success' or error message
 * EX: axois.post(url + '/set-price', {name: 'orange chicken', price: 20});
 */

router.post('/set-price', async (req, res) => {
    try {
        const itemName = req.body.name;
        const newPrice = req.body.price;
        await pool.query(`UPDATE items SET cost=${newPrice} WHERE name='${itemName}';`);
        res.send('success');
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
})

// toggle bool



module.exports = router
