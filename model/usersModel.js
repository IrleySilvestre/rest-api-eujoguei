const connection = require("../db/connection");
class User {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created = user.created;
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
}

module.exports = User;
