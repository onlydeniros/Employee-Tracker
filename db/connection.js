const mysql = require('mysql2');
require('dotenv').config()
console.log(process.env);

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.SECRET_KEY,
        database: 'employee'

    }
);

module.exports = db;
