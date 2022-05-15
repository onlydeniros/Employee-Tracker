const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');




db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employeeTacker();
})

const employeeTacker = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                addDepartment();
                break

            case 'Add Roles':
                addRole();
                break

            case 'Update Employee Role':
                updateEmployeeRole();
                break

            case 'Exit':
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        employeeTacker();
    };
}


const employeeView = async () => {
    console.log('Employee View');
    try {
        let query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            employeeTacker();
        });
    } catch (err) {
        console.log(err);
        employeeTacker();
    };
}

const departmentView = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            employeeTacker();
        });
    } catch (err) {
        console.log(err);
        employeeTacker();
    };
}

const roleView = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        db.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            employeeTacker();
        });
    } catch (err) {
        console.log(err);
        employeeTacker();
    };
}

const employeeAdd = async () => {
    try {
        console.log('Employee Add');

        db.query("SELECT * FROM role",
            function (err, roles) {
                db.query("SELECT * FROM employee",
                    function (err, managers) {


                        let answer = inquirer.prompt([
                            {
                                name: 'firstName',
                                type: 'input',
                                message: 'What is the first name of this Employee?'
                            },
                            {
                                name: 'lastName',
                                type: 'input',
                                message: 'What is the last name of this Employee?'
                            },
                            {
                                name: 'employeeRoleId',
                                type: 'list',
                                choices: roles.map((role) => {
                                    return {
                                        name: role.title,
                                        value: role.id
                                    }
                                }),
                                message: "What is this Employee's role id?"
                            },
                            {
                                name: 'employeeManagerId',
                                type: 'list',
                                choices: managers.map((manager) => {
                                    if (manager.first_name != null) {
                                        return {
                                            name: manager.first_name + " " + manager.last_name,
                                            value: manager.id
                                        }
                                    }
                                }),
                                message: "What is this Employee's Manager's Id?"
                            }
                        ]).then((answer) => {
                            let result = db.query("INSERT INTO employee SET ?", {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: (answer.employeeRoleId),
                                manager_id: (answer.employeeManagerId)
                            });
                            console.log(result)

                            console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
                            employeeTacker();
                        })


                    });

            })
    } catch (err) {
        console.log(err);
        employeeTacker();
    };
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        db.query(query, answer.department, function(err, res) {
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        departmentView();
        })
}



  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's title",
          name: "roleTitle"
        },
        {
          type: "input",
          message: "Enter the employee's salary",
          name: "roleSalary"
        },
        {
          type: "input",
          message: "Enter the employee's department ID",
          name: "roleDept"
        }
      ])
      .then(function (res) {
        const title = res.roleTitle;
        const salary = res.roleSalary;
        const departmentID = res.roleDept;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        db.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          employeeTacker();
        });
      });
  }

  function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmployee"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmploy = res.updateEmployee;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
        db.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          employeeTacker();
        })
      });
    }