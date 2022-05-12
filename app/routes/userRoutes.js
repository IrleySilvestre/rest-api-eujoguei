module.exports = (app) => {
  const userControler = require("../controllers/userController");
  const router = require("express").Router();

  router
    .get("/", userControler.listAll)
    .get("/:id", userControler.findById)
    .post("/", userControler.add)
    .delete("/:id", userControler.remove)
    .patch("/:id", userControler.update)
    .get("/role/:id_role", userControler.findUserByRole);

  app.use("/user", router);
};
