const router = require("express").Router();
const isAuth = require('../middlewares/isAuthenticated')
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/commandeController");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id",isAuth, remove);
router.put("/:id",isAuth, update);

module.exports = router;
