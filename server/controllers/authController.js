const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SUCRET_KEY, POWER_HASH } = require("dotenv").config().parsed;
const joi = require("joi");
const register = async (req, res) => {
  const schema = joi.object({
    user_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
    isAdmin: joi.boolean().default(false),
    image: joi.string().default(""),
  });
  try {
    const { error, value } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: value.email });
    if (user)
      return res.status(400).json({
        message: "Email is already in use. Please choose another one.",
      });
    const hashPass = await bcryptjs.hash(value.password, Number(POWER_HASH));
    const newUser = new User({ ...value, password: hashPass });
    const saveUser = await newUser.save();
    res
      .status(201)
      .json({ message: "You registered successfully. Please log in." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().trim().email().required(),
      password: joi.string().required().min(8),
    });
    const { error, value } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "You are not registered. Please register first." });
    }
    const Password = await bcryptjs.compare(value.password, user.password);
    if (!Password)
      return res.status(401).json({ message: "Incorrect password." });
    const { email, isAdmin, _id } = user;
    const token = jwt.sign({ email, isAdmin, _id }, SUCRET_KEY);
    res.status(201).json({
      message: `login successefely welcome ${user.user_name}`,
      token,
      user: {
        _id,
        user_name: user.user_name,
        email,
        isAdmin,
        image: user.image,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
   
    const users = await User.find().select('-password').sort({ updatedAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login,getAll };
