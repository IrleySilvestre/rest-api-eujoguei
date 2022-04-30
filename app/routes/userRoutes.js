module.exports = (app) => {
  const userControler = require("../controllers/userController");
  const router = require("express").Router();

  router
    .get("/", userControler.listAll)
    .get("/:id", userControler.listById)
    .post("/", userControler.add)
    .delete("/:id", userControler.remove)
    .patch("/:id", userControler.update);

  app.use("/user", router);
};
