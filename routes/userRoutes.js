module.exports = (app) => {
  const userControler = require("../controllers/userControler");
  const router = require("express").Router();

  router
    .get("/list", userControler.listAll)
    .post("/add", userControler.add)
    .delete("/remove/:id", userControler.remove);

  app.use("/user", router);
};
