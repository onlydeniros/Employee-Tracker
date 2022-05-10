const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');

















db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
})