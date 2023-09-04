const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) res.send({ msg: "auth failed", err: err });
      else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  authentication,
};
