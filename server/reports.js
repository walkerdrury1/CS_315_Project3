const e = require("express");
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false },
});

router.get("/transaction-history/:date", async (req, res) => {
    try {
        const {date} = req.params;
        const q1 = `CREATE OR REPLACE VIEW view11 AS SELECT indexid, transactionitems.transactionid, id FROM transactionitems LEFT JOIN transactions on transactionitems.transactionid = transactions.transactionid WHERE transactiondate >= '${date}';`;
        await pool.query(q1);
        const q2 =
            "SELECT name, count(*) amountOrdered from view11 NATURAL JOIN items GROUP BY (id, name) ORDER BY amountOrdered DESC;";
        const to_return = (await pool.query(q2)).rows;
        res.json(to_return)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * Description: Returns popular pairs
 * Requires: Start date, end date
 * Returns: Json of popular pairs
 * EX: axois.post(url + '/get-pairs', {startDate: '1/1/1000', endDate:'3/3/3000'});
 */

router.post("/get-pairs", async (req, res) => {
    try {
        const itemData = (await pool.query("SELECT * FROM items")).rows;
        let lookUp = {};

        itemData.forEach((item) => {
            lookUp[item.id] = item.name;
        });

        startDate = req.body.startDate;
        endDate = req.body.endDate;

        const views44 = `CREATE OR REPLACE VIEW view44 AS select transactionid, indexid, id from transactionitems NATURAL JOIN transactions WHERE '${startDate}' <= transactiondate AND transactiondate <= '${endDate}';`;
        const pairsview = `CREATE OR REPLACE VIEW pairsview AS SELECT a.id id1, b.id id2 FROM view44 a JOIN view44 b on a.transactionid = b.transactionid WHERE a.id != b.id ORDER BY id1, id2;`;

        await pool.query(views44);
        await pool.query(pairsview);

        const data = (
            await pool.query(
                "SELECT id1, id2, count(*) FROM pairsview WHERE id1<id2 GROUP BY id1,id2 ORDER BY count DESC;"
            )
        ).rows;

        let ans = [];

        data.forEach((pair) => {
            let firstItem = lookUp[pair.id1];
            let secondItem = lookUp[pair.id2];
            let count = parseInt(pair.count, 10);
            ans.push([firstItem, secondItem, count]);
        });

        res.json(ans);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

/**
 * Description: Get the items that have totalquantity < minimumamount
 * Requires: Nothing
 * Returns: List of Json objects representing each item to be restocked
 * EX: const data = axois.get('url' + '/restock-report');
 */
router.get("/restock-report", async (req, res) => {
    try {
        const data = await (
            await pool.query(
                "SELECT * FROM INVENTORY WHERE INVENTORY.TOTALQUANTITY < INVENTORY.MINIMUMAMOUNT;"
            )
        ).rows;
        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

router.get("/excess-report/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const q1 = `CREATE OR REPLACE VIEW view50 AS SELECT indexid, transactionitems.transactionid, id FROM transactionitems LEFT JOIN transactions on transactionitems.transactionid = transactions.transactionid WHERE transactiondate >= '${date}';`;
        const q2 = `SELECT id, name, count(*) amountOrdered from view50 NATURAL JOIN items GROUP BY (id, name) ORDER BY amountOrdered DESC;`;
        await pool.query(q1);
        const db_response1 = await pool.query(q2);
        const data = db_response1.rows;
        //console.log(data)
        let ingredientsCount = {};
        for (let i = 0; i < data.length; i++) {
            const name = data[i].name;
            const db_response2 = await pool.query(
                `SELECT itemname FROM items NATURAL JOIN ingredientslist NATURAL JOIN inventory WHERE name = '${name}';`
            );
            //  console.log(db_response2.rows);
            db_response2.rows.forEach((element) => {
                if (element.itemname in ingredientsCount) {
                    ingredientsCount[element.itemname] += parseInt(
                        data[i].amountordered,
                        10
                    );
                } else
                    ingredientsCount[element.itemname] = parseInt(
                        data[i].amountordered,
                        10
                    );
            });
        }

        // console.log(ingredientsCount)
        ans = [];

        const inv = (await pool.query("SELECT * FROM inventory;")).rows;

        inv.forEach((element) => {
            if (!(element.itemname in ingredientsCount)) {
                // never ordered
                ans.push([element.itemname, 0, element.totalquantity]);
            } else if (
                (element.totalquantity + ingredientsCount[element.itemname]) *
                    0.1 >=
                ingredientsCount[element.itemname]
            )
                ans.push([
                    element.itemname,
                    ingredientsCount[element.itemname],
                    element.totalquantity,
                ]);
        });

        //console.log(ans)

        //console.log(data.rows);
        res.send(ans);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

module.exports = router;
