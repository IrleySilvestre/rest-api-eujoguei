const connection = require("../db/connection");
class User {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created = user.created;
    this.fk_roles = user.fk_roles
  }
  static add(newUser, result) {
    const sql = "INSERT INTO users SET ?";
    connection.query(sql, newUser, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      } else {
        console.log("user created:", { id: res.insertId, ...newUser });
        result(null, { id: result.insertId, ...newUser });
      }
    });
  }

  static findByEmail(email, result) {
    const sql = `SELECT * FROM users WHERE email=?`;
    connection.query(sql, email, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }
  static findById(id, result) {
    const sql = `SELECT * FROM users WHERE id=?`;
    connection.query(sql, id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }

  static listAll(result) {
    const sql = "SELECT * FROM  users";
    connection.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }
  static remove(id, result) {
    const sql = `DELETE  FROM users WHERE id=?`;
    connection.query(sql, id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }
  static update(id, user, result) {
    const sql = `UPDATE users SET ? WHERE id = ?`;

    connection.query(sql, [user, id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { res });
      }
    });
  }
}

module.exports = User;
