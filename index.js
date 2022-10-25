const express = require('express');
const router = require('./routes/router.js');
const bodyParser = require('body-parser');
const db = require("./config/sequelizeDB.js");
const baseAuthentication = require('./utils/auth.js');
const app = express();

app.use(express.json());
app.use("/",router);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Request-Headers", "x-access-token");
    next();
});

db.sequelize.sync();

const port = process.env.PORT || 80;

module.exports = app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});



process.on("SIGUSR2", () => {
    console.log("server shutting down");
    setTimeout(() => {
      console.log("hello?");
    }, 80);
});



module.exports = app;

