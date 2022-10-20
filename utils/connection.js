var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'Prasanna@1996'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("CREATE DATABASE IF NOT EXISTS clou", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    conn.query("CREATE TABLE IF NOT EXISTS clou.users (`id` varchar(45) NOT NULL,`username` varchar(45) DEFAULT NULL,`password` varchar(200) DEFAULT NULL,`first_name` varchar(45) DEFAULT NULL,`last_name` varchar(45) DEFAULT NULL,`account_created` varchar(45) DEFAULT NULL,`account_updated` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`)) ", function (err, result) {
        if (err) throw err;
        console.log("table created");
    });
});

module.exports = conn;