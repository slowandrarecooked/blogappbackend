const express = require("express");
require("dotenv").config();
const { authentication } = require("./middlewares/authentication");
const { connection } = require("./config/db");
const { blogController } = require("./controllers/blog.controller");
const { userController } = require("./controllers/user.controller");
const app = express();
app.use(express.json());
app.use("/user", userController);
app.use(authentication);
app.use("/blogs", blogController);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server started on port");
  } catch (error) {
    console.log(error);
  }
});
