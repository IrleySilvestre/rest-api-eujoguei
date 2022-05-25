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

  static updatePermissions(
    permition,
    idRole,
    idAction,
    idFunctionality,
    result
  ) {
    const sql = `
    UPDATE functionality_has_actions 
    SET has_permition = ? 
    WHERE 
      id_role=? AND 
      id_action=? AND 
      id_functionality=?
    `;
    connection.query(
      sql,
      [permition, idRole, idAction, idFunctionality],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          result(null, { res });
        }
      }
    );
  }

  static listRolesPermissions(id, result) {
    if (!id) {
      const sql = `
        SELECT f.id as idFuncionalidade, f.name as funcionalidade, a.id as idAcao, a.name as acao, fa.has_permition as permissao, r.id as idRole,  r.name as role
          FROM functionality f
            INNER JOIN functionality_has_actions fa 
              ON f.id = fa.id_functionality
            INNER JOIN actions a
              ON a.id = fa.id_action
            INNER JOIN roles r
              on r.id = fa.id_role;
          `;

      connection.query(sql, (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, { res });
        }
      });
    } else {
      const sql = `
        SELECT f.id as idFuncionalidade, f.name as funcionalidade, a.id as idAcao, a.name as acao, fa.has_permition as permissao, r.id as idRole,  r.name as role
          FROM functionality f
            INNER JOIN functionality_has_actions fa 
              ON f.id = fa.id_functionality
            INNER JOIN actions a
              ON a.id = fa.id_action
            INNER JOIN roles r
              on r.id = fa.id_role
          where r.id = ?;
          `;
      connection.query(sql, id, (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, { res });
        }
      });
    }
  }
}

module.exports = Roles;
