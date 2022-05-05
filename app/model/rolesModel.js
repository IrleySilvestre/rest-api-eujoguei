const connection = require("../db/connection");

class Roles {
  constructor(roles) {
    this.name = roles.name;
    this.description = roles.description;
  }
  static add(role, result) {
    const sql = `INSERT INTO roles SET ?`;
    connection.query(sql, role, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { id: result.insertId, ...role });
      }
    });
  }

  static listAll(result) {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }

  static findById(id, result) {
    const sql = `SELECT * FROM roles WHERE id=?`;
    connection.query(sql, id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }

  static remove(id, result) {
    const sql = `DELETE FROM roles WHERE id=?`;
    connection.query(sql, id, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, { res });
      }
    });
  }

  static update(id, role, result) {
    const sql = `UPDATE roles SET ? WHERE id = ?`;

    connection.query(sql, [role, id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }

  static listRolesPermissions(result) {
    const sql = `
        SELECT f.name as funcionalidade, a.name as acao, fa.has_permition as permissao
            FROM functionality f
            INNER JOIN functionality_has_actions fa 
                ON f.id = fa.fk_functionality
            INNER JOIN actions a
                ON a.id = fa.fk_actions;`;
    connection.query(sql, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, { res });
      }
    });
  }
}

module.exports = Roles;
