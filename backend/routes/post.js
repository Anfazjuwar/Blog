// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { model } = require("mongoose");
// const bcrypt = require("bcryptjs");
// const Post = require("../models/Post");
// const Comment = require("../models/Comment");
// const verifyToken = require("../verifyToken");

// //CREATE

// router.post("/create", verifyToken, async (req, res) => {
//   try {
//     const newPost = new Post(req.body);
//     // console.log(req.body)
//     const savedPost = await newPost.save();

//     res.status(200).json(savedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// //UPDATE

// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const updatePost = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatePost) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     res.status(200).json(updatePost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE

// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     await Comment.deleteMany({ postId: req.params.id });
//     res.status(200).json("post has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET POST DETAILS

// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     np;
//     res.status(500).json(err);
//   }
// });

// //GET POST

// router.get("/", async (req, res) => {
//   const query = req.query;
//   console.log(query);
//   try {
//     const searchFilter = {
//       title: { $regex: query.search, $options: "i" },
//     };
//     const posts = await Post.find(query.search ? searchFilter : null);
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET POST

// router.get("/user/:userID", async (req, res) => {
//   try {
//     const posts = await Post.find({ userID: req.params.userID });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //SEARCH POSTS

// module.exports = router;
