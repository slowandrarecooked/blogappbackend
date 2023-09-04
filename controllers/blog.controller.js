const express = require("express");
const { Blogmodel } = require("../models/blog.model");
const blogController = express.Router();

blogController.get("/", async (req, res) => {
  const queries = req.query;
  console.log(queries);
  let blogs = queries ? await Blogmodel.find() : {};
  if (queries.Title) {
    blogs = await Blogmodel.find({ Title: queries.Title });
  }
  if (queries.Category) {
    blogs = await Blogmodel.find({ Category: queries.Category });
  }
  if (queries.Author) {
    blogs = await Blogmodel.find({ Author: queries.Author });
  }
  if (queries.Title && queries.Category) {
    blogs = await Blogmodel.find({
      Title: queries.Title,
      Category: queries.Category,
    });
  }
  res.send(blogs);
});
blogController.post("/create", async (req, res) => {
  try {
    const { Title, Category, Author, Content } = req.body;
    const newblog = new Blogmodel({
      Title,
      Category,
      Author,
      Content,
      userId: req.body.userId,
    });
    newblog.save();
    res.send("blog added");
  } catch (error) {
    res.send("could not add blog");
  }
});
blogController.patch("/:blogId/update", async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blogmodel.updateOne(
      { _id: blogId, userId: req.body.userId },
      { ...req.body }
    );
    res.send("updated");
  } catch (error) {
    res.send("could not update");
    console.log(error);
  }
});
blogController.delete("/:blogId/delete", async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blogmodel.deleteOne({ _id: blogId, userId: req.body.userId });
    res.send("deleted");
  } catch (error) {
    res.send("could not delete");
    console.log(error);
  }
});
module.exports = {
  blogController,
};
