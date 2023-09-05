const express = require("express");
const { Usermodel } = require("../models/user.model");
const userController = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
userController.post("/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 2, (err, hash) => {
      const newuser = new Usermodel({
        name,
        email,
        password: hash,
      });
      newuser.save();
      res.send("user added");
    });
  } catch (error) {
    res.send("unable to add user");
    console.log(error);
  }
});
userController.post("/login", async (req, res) => {
  try {
  } catch (error) {}
  const { email, password } = req.body;
  const is_user = await Usermodel.findOne({ email });

  if (is_user) {
    bcrypt.compare(password, is_user.password, (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
      } else {
        const token = jwt.sign({ userId: is_user._id }, process.env.SECRET);
        res.send({ msg: "logged in", token: token });
      }
    });
  }
});
module.exports = {
  userController,
};
