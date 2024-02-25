const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updateComment) {
      return res.status(404).json({ error: "comment not found" });
    }

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
