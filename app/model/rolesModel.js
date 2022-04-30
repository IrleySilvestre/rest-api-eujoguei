const connection = require("../db/connection")

class Roles {
    constructor(roles){
        this.name = roles.name
        this.description = roles.description
    }
    static add(role, result){
        const sql = `INSERT INTO roles SET ?`
        connection.query(sql, role, (err, res)=>{
            if (err) {
                result(err, null)
                return
            } else {
                result(null, {id: result.insertId, ... role})               
            }
        })
    }
}

module.exports = Roles