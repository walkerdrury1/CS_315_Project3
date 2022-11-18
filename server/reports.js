const express = require('express')
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

/**
 * Description: Returns popular pairs
 * Requires: Start date, end date
 * Returns: Json of popular pairs
 * EX: axois.post(url + '/get-pairs', {startDate: '1/1/1000', endDate:'3/3/3000'});
 */

router.post('/get-pairs', async (req, res) => {
    try {
        const itemData = (await pool.query("SELECT * FROM items")).rows;
        let lookUp = {}
        
        itemData.forEach(item => {
            lookUp[item.id] = item.name
        });
        
        startDate = req.body.startDate
        endDate = req.body.endDate

        const views44 = `CREATE OR REPLACE VIEW view44 AS select transactionid, indexid, id from transactionitems NATURAL JOIN transactions WHERE '${startDate}' <= transactiondate AND transactiondate <= '${endDate}';`
        const pairsview = `CREATE OR REPLACE VIEW pairsview AS SELECT a.id id1, b.id id2 FROM view44 a JOIN view44 b on a.transactionid = b.transactionid WHERE a.id != b.id ORDER BY id1, id2;`
        
        await pool.query(views44);
        await pool.query(pairsview);

        const data = (await pool.query("SELECT id1, id2, count(*) FROM pairsview WHERE id1<id2 GROUP BY id1,id2 ORDER BY count DESC;")).rows;

        let ans = []

        data.forEach(pair => {
           let firstItem = lookUp[pair.id1]
           let secondItem = lookUp[pair.id2]
           let count = parseInt(pair.count, 10)
           ans.push([firstItem, secondItem, count]) 
        });

        res.json(ans)
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
})


module.exports = router
