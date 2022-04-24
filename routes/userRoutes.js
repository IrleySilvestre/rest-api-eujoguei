module.exports = (app) => {
  const userControler = require("../controllers/userControler");
  const router = require("express").Router();

  router
    .get("/", userControler.listAll)
    .post("/", userControler.add)
    .delete("/:id", userControler.remove);

  app.use("/user", router);
};
