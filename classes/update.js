const db = require('../db/connection');


class Update {
    constructor(db) {
        this.db = db;
    }

    updateEmployee(employee_id, role_id) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`
        return this.db.promise().query(sql, [employee_id, role_id]);
    }



}



module.exports = new Update(db)