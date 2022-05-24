module.exports = (app) => {
  const roleController = require("../controllers/roleController");
  const router = require("express").Router();

  router
    .post("/", roleController.add)
    .get("/", roleController.listAll)
    .get("/permissions/:id?", roleController.listRolesPermissions)
    .get("/:id", roleController.findById)
    .patch("/:id", roleController.update)
    .delete("/:id", roleController.remove);

  app.use("/role", router);
};
