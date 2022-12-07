const express = require('express')
const { Pool } = require('pg');
const axios = require("axios");
const {google} = require('googleapis');
const url = require('url');


const router = express.Router()

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLEID,
    process.env.GOOGLESECRET,
    process.env.GOOGLEREDIRECT
  );

const scopes = [
    
    'https://www.googleapis.com/auth/userinfo.email'
]


router.get('/googleinit', async(req, res) => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });
    res.writeHead(301, { "Location": authorizationUrl });
})


router.get('/googlecallback', async(req, res) => {
    
    
    let q = url.parse(req.url, true).query;

    if (q.error) { // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
    } 

    else {
        let { tokens }  = await oauth2Client.getToken(q.code);
        const data =  (await axios.get(`https://www.googleapis.com/userinfo/v2/me?access_token=${tokens['access_token']}`, 
        {headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
        }})).data
    
        const email = data['email']
        
        const sqlQuery = `SELECT * FROM users WHERE email='${email}';`
        const result = await pool.query(sqlQuery);
        if (result.rows == 0) {
            res.send({role : 'None'});
        }
        else{
            res.send({role : `${result.rows[0].role}`});
        }

    }
    
    
})





module.exports = router