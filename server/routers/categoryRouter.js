const categoryRouter = require("express").Router();
const { getAll ,getById,create,update,remove } = require("../controllers/categoryController");
const isAuth = require('../middlewares/isAuthenticated')
categoryRouter.get("/", getAll);
categoryRouter.get("/:id", getById);
categoryRouter.post("/", create);
categoryRouter.delete("/:id",isAuth, remove);
categoryRouter.put("/:id",isAuth, update);

module.exports = categoryRouter;
