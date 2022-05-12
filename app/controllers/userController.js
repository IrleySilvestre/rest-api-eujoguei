const User = require("../model/usersModel");
const moment = require("moment");
const bcrypt = require("bcrypt");

function isEmail(email) {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email);
}

const encryptPassoword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

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
    const email = req.body.email;

    User.findByEmail(email, (err, data) => {
      if (err) {
        res.status(500).send({ messag: err.message });
      } else {
        const email = data.res;
        if (!email[0]) {
          const created = moment().format("YYYY-MM-DD HH:MM:ss");
          const newUser = { created, ...req.body };

          newUser.password = encryptPassoword(newUser.password);

          User.add(newUser, (err, data) => {
            if (err) {
              res.status(500).send({
                message: err.message || " Error while creating User",
              });
            } else {
              res.status(200).json(data);
            }
          });
        } else {
          res.status(500).json({ message: "Email já esta sendo utilizado" });
        }
      }
    });
  }
};

exports.listAll = (req, res) => {
  User.listAll((err, data) => {
    if (err) {
      res.status(500).send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.findById = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, data) => {
    if (err) {
      res.status(500).send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  User.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.findUserByRole = (req, res)=>{
  const {id_role} =  req.params
  User.findUserByRole(id_role, (err, data)=>{
    if (err){
      res.status(500);
      res.send({ messag: err.message });
    }else{
      res.status(200).json(data)
    }
  })
}

exports.update = (req, res) => {
  const user = req.body;
  const { id } = req.params;
  User.update(id, user, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};
