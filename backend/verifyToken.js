const jwt = require("jsonwebtoken");

//midle ware

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Youu are not athenticated!");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("TOKEN IS NOT VALID");
    }
    req.userID = data._id;
    console.log("passed");
    next();
  });
};

module.exports = verifyToken;
