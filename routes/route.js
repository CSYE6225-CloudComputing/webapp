const express = require("express");
const router = express.Router();

router.get('/healthz', (req, res) => {
    res.send('Welcome to node app')
})

module.exports = router;
