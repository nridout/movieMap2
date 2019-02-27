"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));
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
  if (req.session.userid) {
    return res.status(200).redirect("/maps");
  } else {
    return res.status(200).render("index", {isLogged: false});
  }
});

app.get("/login", (req, res) => {
  return res.status(200).render("login", {isLogged: false});
});

app.post("/login", (req, res) => {
  knex.select('*').from('users')
  .where(function () {
    this.where('email', req.body.email);
  })
  .then(function (rows) {
    if (rows.length) {
      if (bcrypt.compareSync(req.body.password, rows[0].password)) {
        req.session.userid = rows[0].id;
        return res.redirect("/maps");
      } else {
        return res.status(400).send("error: incorrect password");
      }
    } else {
      return res.status(400).send("error: non-registered email");
    }
  });
});

app.post("/logout", (req, res) => {
  if (req.session.userid) {
    req.session = null;
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
});

app.get("/register", (req, res) => {
  res.render("register", {isLogged: false});
});

app.post("/register", (req, res) => {
  knex.select('*').from('users')
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
        knex.select('*').from('users')
        .where(function () {
          this.where('username', req.body.username);
        })
        .then(function (rows_user) {
          req.session.userid = rows_user[0].id;
          return res.redirect("/maps");
        });
      });
    } else {
      return res.status(400).send("error: username or email already taken");
    }
  });
});

app.get("/maps", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('maps')
    .then(function (rows) {
      return res.status(200).render("maps_index", {maps: rows, isLogged: true});
    });
  } else {
    return res.redirect("/login");
  }
});

app.get("/maps/new", (req, res) => {
  if (req.session.userid) {
    return res.status(200).render("new_map", {isLogged: true});
  } else {
    return res.redirect("/login");
  }
});

app.post("/maps", (req, res) => {
  if (req.session.userid) {

    knex.select('*').from('maps')
    .where(function () {
      this.where('creator_id', req.session.userid);
    })
    .then(function (rows_maps) {
      const map_names = [];
      for (const row in rows_maps) {
        map_names.push(row.name);
      }

      if (!map_names.includes(req.body.name)) {
        // **TODO: check if location is valid
        //***********************************

        const newMap = {
          location: req.body.location,
          name: req.body.name,
          creator_id: req.session.userid
        };

        knex('maps').insert([newMap])
        .then(function () {

          knex.select('*').from('maps')
          .where(function () {
            this.where('creator_id', newMap.creator_id);
          }).andWhere(function () {
            this.where('name', newMap.name);
          })
          .then(function (rows_new) {
            return res.redirect(`/maps/${rows_new[0].id}`);
          });
        });
      } else {
        return res.status(400).send("error: duplicate map name");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

app.get("/maps/:id", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('maps')
    .where(function () {
      this.where('id', req.params.id);
    })
    .then(function (rows) {
      return res.status(200).render("map_page", {map: rows[0], isLogged: true});
    });
  } else {
    return res.redirect("/login");
  }
});

app.put("/maps/:id", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('maps')
    .where(function () {
      this.where('id', req.params.id);
    })
    .then(function (rows_maps) {
      if (rows_maps[0].creator_id === req.session.userid) {
        knex('maps')
        .where(function () {
          this.where('creator_id', req.session.userid);
        })
        .andWhere(function () {
          this.where('name', rows_maps[0].name);
        })
        .update({
          name: req.body.name,
          location: req.body.location
        })
        .then(function () {
          return res.redirect(`/maps/${req.params.id}`);
        });
      } else {
        return res.status(401).send("error: unauthorized");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

app.delete("/maps/:id", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('maps')
    .where(function () {
      this.where('id', req.params.id);
    })
    .then(function (rows_maps) {
      if (rows_maps[0].creator_id === req.session.userid) {
        knex('maps')
        .where(function () {
          this.where('creator_id', req.session.userid);
        })
        .andWhere(function () {
          this.where('name', rows_maps[0].name);
        })
        .del()
        .then(function () {
          return res.redirect("/maps");
        });
      } else {
        return res.status(401).send("error: unauthorized");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
