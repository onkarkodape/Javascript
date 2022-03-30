const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();

const posts = [
    {
      username: "kodape",
      title: "Post 1",
    },
    {
      username: "onkar",
      title: "Post 2",
    },
  ];



router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((posts) => posts.username === req.user.name));
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
  
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
module.exports = router;
