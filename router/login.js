const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/login", (req, res) => {
  //Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ acessToken });
});


module.exports = router;
