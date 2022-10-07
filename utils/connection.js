var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost', // Replace with your host name
    user: 'root', // Replace with your database username
    password: 'Prasanna@1996', // Replace with your database password
    database: 'cloud2' //  Replace with your database Name
});

conn.connect(function (err) {
    if (err) 
        throw err;
    // console.log('Database is connected successfully !');
});

module.exports = conn;