const authRouter = require("express").Router();
const { register,login,getAll } = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/all", getAll);

module.exports = authRouter;
