const User = require("../model/usersModel");

module.exports = (app) => {
  app.post("/users", (req, res) => {
    const user = req.body;
    User.add(user, res);
  });
  app.get("/users", (req, res) => {
    User.list(res);
  });
};
