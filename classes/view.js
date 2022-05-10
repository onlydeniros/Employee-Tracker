const db = require('../db/connection');
const cTable = require('console.table')

class View {
    constructor(db) {
        this.db = db
    }


    viewDepartment() {
        const sql = `SELECT * FROM department;`
        return this.db.promise().query(sql)
        //console.table(sql)
    }
    viewRole() {
        const sql = `SELECT role.*,department.name AS department FROM role
                    LEFT JOIN department ON role.department_id = department.id;`
        return this.db.promise().query(sql)
    }
    viewEmployee() {
        const sql = `SELECT employee.*,role.title,role.salary,department.name AS department FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id;`
        return this.db.promise().query(sql)
    }



}


module.exports = new View(db);