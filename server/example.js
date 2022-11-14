const express = require('express')
const router = express.Router()


router.get("/yaroub", (req, res) => {
    res.send("Late")
})

module.exports = router
