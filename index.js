const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');

const views = require('./classes/view');
const { viewRole } = require('./classes/view');
const update = require('./classes/update');

function menu() {
    inquirer.prompt([
        {

        }
    ])
        .then((data) => {

        })
}


function findDepartments() {
    views.viewDepartment()
        .then(([department]) => {
            console.table(department)
        })
}

function findRole() {
    views.viewRole()
        .then(([role]) => {
            console.table(role)
        })
}

function updateEmployeeRole() {
    views.viewEmployee()
        .then(([employee]) => {
            const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: "What employee do you want to update?",
                    choices: employeeChoices
                }
            ])
            .then((data)=> {
                // find roleId to update
            })
        })
}

// findDepartments()
findRole()









db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
})
