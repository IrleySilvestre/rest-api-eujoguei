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
      res.server(500).send({ message: err.message });
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
  Role.listRolesPermissions((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(data);
    }
  });
};
