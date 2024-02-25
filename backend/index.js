const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const PostRoute = require("./routes/post");
const CommentRoute = require("./routes/comment");
const path = require("path");
//database

//databse conneting method

dotenv.config(); //

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database conneted succesfully");
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoute);
app.use("/api/user", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/comments", CommentRoute);

//image upload

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null,"image1.jpg")
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.status(200).json("Image has been uploaded successfully!");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
