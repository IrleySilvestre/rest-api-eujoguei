const User = require("../model/usersModel");
const moment = require("moment");

function isEmail(email) {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email);
}

exports.add = (req, res) => {
  const name = req.body.name
    ? req.body.name.length >= 3
    : !req.body.name === undefined;

  const password = req.body.password
    ? req.body.password.length >= 6
    : !req.body.password === undefined;

  const email = req.body.password
    ? isEmail(req.body.email)
    : !req.body.email === undefined;

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
      name: "password",
      valid: password,
      errorMessage: "Password deve possuir no minimo 6 caracteres",
    },
  ];

  const errors = validations.filter((fild) => !fild.valid);

  if (errors.length) {
    res.status(400).json(errors);
  } else {
    if (req.body.id) {
      res.send("User com id");
    } else {
      const created = moment().format("YYYY-MM-DD HH:MM:ss");
      const newUser = { created, ...req.body };
      const user = new User(newUser);

      User.findByEmail(email, (err, data) => {
        if (err) {
          res.status(500);
          res.send({ messag: err.message });
        } else {
          if (data.res.length) {
            User.add(user, (err, data) => {
              if (err) {
                res.status(500).send({
                  message: err.message || " Error while creating User",
                });
              } else {
                res.status(200).json(data);
              }
            });
          } else {
            res.send({ msg: "email ja cadastrado" });
          }
        }
      });
    }
  }
};

exports.listById = (req, res) => {
  res.send("Listar por id");
};
exports.listAll = (req, res) => {
  User.listAll((err, data) => {
    if (err) {
      res.status(500);
      res.send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};
exports.remove = (req, res) => {
  res.send("Remover");
};
