const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs"); //hiding password
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt); //s should be capital
    const newUser = new User({ username, email, password: hashPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("user not found !");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("wrong credential");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
    // res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT

router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("user LOg out succfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REFETCh USER

router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
