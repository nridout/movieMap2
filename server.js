"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2] // Change the keys value into some strings for testing
}));


// Home page
app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/login", (req, res) => {
  res.status(200).render("login");
});

app.post("/login", (req, res) => {
  res.status(200).send("Not implemented");
});

app.post("/logout", (req, res) => {
  res.status(200).send("Not implemented");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  knex.select('email').from('users')
  .where(function () {
    this.where('username', req.body.username);
  }).orWhere(function () {
    this.where('email', req.body.email);
  })
  .then(function (rows) {
    if (!rows.length) {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };

      knex('users').insert([newUser])
      .then(function (rows) {
        req.session.userid = username;
        return res.redirect("/");
      });
    } else {
      return res.status(400).send("error: username or email already taken");
    }
  });
});

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
