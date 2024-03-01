const jwt = require("jsonwebtoken");
const { SUCRET_KEY } = require("dotenv").config().parsed;
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res.status(401).json({ message: "Vous n'êtes pas connecté(e)!" });

    const payload = jwt.verify(token, SUCRET_KEY);
    if (!payload)
      return res.status(400).json({ message: "Vous n'êtes pas connecté(e)!" });
    req._id = payload._id;
    req.is_admin = payload.isAdmin;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
module.exports = isAuth;
