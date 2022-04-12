const connection = require("../db/connection");
const moment = require("moment");
class Users {
  add(user, res) {
    const created = moment().format("YYYY-MM-DD HH:MM:ss");

    user = { created, ...user };

    const name = user.name.length >= 3;

    const password = user.password.length >= 6;

    const email = this.isEmail(user.email);

    const validations = [
      {
        name: "name",
        valid: name,
        errorMessage: "Nome deve ter no minimo 3 caracteres",
      },
      {
        name: "email",
        valid: email,
        errorMessage: "Email inválido",
      },
      {
        name: "passord",
        valid: password,
        errorMessage: "Password deve possuir no minimo 6 caracteres",
      },
    ];

    const errors = validations.filter((fild) => !fild.valid);

    if (errors.length) {
      res.status(400).json(errors);
    } else {
      const sql = "INSERT INTO users SET ?";
      connection.query(sql, user, (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          user = { id: result.insertId, ...user };
          res.status(201).json({ msg: "Add with success", user });
        }
      });
    }
  }

  isEmail(email) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    return regex.test(email);
  }

  list(res) {
    const sql = "SELECT * FROM users";
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (result.length === 0) {
          res.status(201).json({ msg: "Empty table" });
        } else {
          res.status(200).json(result);
        }
      }
    });
  }
}

module.exports = new Users();
