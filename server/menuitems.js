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

/**
 * Description: Change the type of an existing item in the database
 * Requires: name and new type
 * Returns: 'success' or error message
 * EX: axois.post(url + '/change-type', {name: 'orange chicken', type: side});
 */

router.post('/change-type', async (req, res) => {
    try {
        const itemName = req.body.name;
        const newType = req.body.type;
        await pool.query(`UPDATE items SET type='${newType}' WHERE name= '${itemName}';`)
        res.send('success');
        const x = await pool.query(`SELECT * from items WHERE name = '${itemName}'`)
        res.send(x)
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
})

/**
 * Description: Change the ingredients of an existing item in the database
 * Requires: name and new ingredients list
 * Returns: 'success' or error message
 * EX: axois.post(url + '/change-ingredients', {name: 'orange chicken', ingredients: ['orange', 'chicken']});
 */

router.post('/change-ingredients', async (req, res) => {
    
    // clear old
   // 

    try {
        const itemName = req.body.name;
        const newIngredients = req.body.ingredients;

        const itemId = (await pool.query(`SELECT id FROM items WHERE name='${itemName}'`)).rows[0].id;
        await pool.query(`DELETE FROM ingredientslist WHERE id=${itemId}`);
        let newIndexId = (await pool.query("SELECT MAX(indexid) from ingredientslist;")).rows[0].max + 1;
        let newIngId = (await pool.query("SELECT MAX(itemid) FROM inventory;")).rows[0].max + 1;

        for (let i = 0; i < newIngredients.length; i++) {
            let ingredient = newIngredients[i];

            let data = (await pool.query(`SELECT * FROM inventory WHERE itemname='${ingredient}';`)).rows;
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
            newIndexId++;
        }

        res.send('success');
            
        
        
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
})

/**
 * Description: Sets the onmenu flag to no
 * Requires: name
 * Returns: 'success' or error message
 * EX: axois.post(url + '/remove-item', {name: 'orange chicken'});
 */
router.post('/remove-item', async (req, res) => {
    try {
        const itemName = req.body.name;
        await pool.query(`UPDATE items SET onmenu='no' WHERE name='${itemName}';`);
        res.send('success');
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
}) 


/**
 * Description: Toggles the onmenu flag
 * Requires: name
 * Returns: 'success' or error message
 * EX: axois.post(url + '/toggle-item', {name: 'orange chicken'});
 */
 router.post('/toggle-item', async (req, res) => {
    try {
        const itemName = req.body.name;
        const data = (await pool.query(`SELECT * FROM items WHERE name='${itemName}';`)).rows;
        if (data.length > 0) {
            // item exists
            if (data[0].onmenu == 'yes') await pool.query(`UPDATE items SET onmenu='no' WHERE name='${itemName}';`);
            else await pool.query(`UPDATE items SET onmenu='yes' WHERE name='${itemName}';`);
        }
        res.send('success');
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
}) 

/**
 * Description: Get the ingredients for a given menu item
 * Requires: name
 * Returns: list of objects of type {itemname: itemname}
 * EX: axois.get(url + '/get-ingredients/' + 'orange chicken')
 * EX response: [{itemname:'chicken'},{itemname:'orange sauce'}]
 */
router.get('/get-ingredients/:name', async (req, res) => {
    try{
        const {name} = req.params;
        const db_response1 = await pool.query(`SELECT itemname FROM ingredientslist NATURAL JOIN inventory NATURAL JOIN items WHERE name = '${name}';`);
        res.send(db_response1.rows);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

module.exports = router
