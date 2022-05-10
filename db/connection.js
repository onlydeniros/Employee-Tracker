const mysql = require('mysql2');
require('dotenv').config()


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.SECRET_KEY,
        database: 'employee_db'

    }
);

module.exports = db;
