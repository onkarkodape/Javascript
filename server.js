require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const loginRoutes = require("./router/login");
const postRoutes = require("./router/post");

app.use(express.json());

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

//TO post the username after after authentication
//app.get("/posts", authenticateToken, (req, res) => {
//  res.json(posts.filter((posts) => posts.username === req.user.name));
//});

///app.post("/login", (req, res) => {
//Authenticate User
// const username = req.body.username;
//const user = { name: username };
//const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//res.json({ acessToken });
//});
app.use(postRoutes);
app.use(loginRoutes);

//To verify the token is correct or not we use middleware
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

app.listen(3000);
