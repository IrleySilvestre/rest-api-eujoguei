const Role = require("../model/rolesModel");

exports.add = (req, res) => {
  const role = req.body;

  Role.add(role, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.listAll = (req, res) => {
  Role.listAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.findById = (req, res) => {
  Role.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};
exports.remove = (req, res) => {
  const { id } = req.params;
  Role.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};
exports.update = (req, res) => {
  const role = req.body;
  const { id } = req.params;
  Role.update(id, role, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ messag: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.listRolesPermissions = (req, res) => {
  Role.listRolesPermissions(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.updatePermissions = (req, res) => {
  const { permition } = req.query;
  const { idRole } = req.query;
  const { idAction } = req.query;
  const { idFunctionality } = req.query;
  Role.updatePermissions(
    permition,
    idRole,
    idAction,
    idFunctionality,
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).json(data);
      }
    }
  );
};
