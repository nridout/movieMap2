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
const request     = require('request');


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
// Without the cookie, renders index page with isLogged

// 'isLogged': A variable to differentiate navbar buttons for logged in users and guests

// 'username': A variable used to set the path in the navbar,
// so that clicking 'Profile' button will get the user to their own page

app.get("/", (req, res) => {
  if (req.session.userid) {
    return res.status(200).redirect("/maps");
  } else {
    return res.status(200).render("index", {isLogged: false, username: ""});
  }
});

app.get("/login", (req, res) => {
  return res.status(200).render("login", {isLogged: false, username: ""});
});

app.post("/login", (req, res) => {
  knex.select('*').from('users')
  .where('email', req.body.email)
  .then(function (rows) {
    // The 'rows' is the output from 'SELECT * FROM users WHERE email = req.body.email;'
    if (rows.length) {
      if (bcrypt.compareSync(req.body.password, rows[0].password)) {
        // If password matches, sets cookie session to be the 'id' of the user in the db
        req.session.userid = rows[0].id;
        return res.redirect("/maps");
      } else {
        // ** TODO: has to modify this error handling
        // Ex. make the form submit through AJAX so that an error message is displayed without
        // moving away from the login page
        return res.status(400).send("error: incorrect password");
      }
    } else {
      // ** TODO: has to modify this error handling
      // Ex. make the form submit through AJAX so that an error message is displayed without
      // moving away from the login page
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
  res.render("register", {isLogged: false, username: ""});
});

app.post("/register", (req, res) => {
  knex.select('*').from('users')
  .where('username', req.body.username)
  .orWhere('email', req.body.email)
  .then(function (rows) {
    // 'rows' = 'SELECT * FROM users WHERE username = req.body.username OR email = req.body.email;'
    if (!rows.length) {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };

      knex('users').insert([newUser])
      .then(function (rows2) {
        knex.select('*').from('users')
        .where('username', req.body.username)
        .then(function (rows_user) {
          // rows_user is obtained with repetitive knex call to get the 'id' for this new user
          req.session.userid = rows_user[0].id;
          return res.redirect("/maps");
        });
      });
    } else {
      // ** TODO: has to modify this error handling
      // Ex. make the form submit through AJAX so that an error message is displayed without
      // moving away from the register page
      return res.status(400).send("error: username or email already taken");
    }
  });
});

app.get("/maps", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('users')
    .where('id', req.session.userid)
    .then(function (rows_user) {
      // rows_user is obtained only to pass the username variable to the 'ejs'
      // This is done for every 'ejs' rendering that needs username variable for the loggin in user
      knex.select('*').from('maps')
      .then(function (rows) {
        return res.status(200).render("maps_index", {maps: rows, isLogged: true, username: rows_user[0].username});
      });
    });
  } else {
    return res.redirect("/login");
  }
});

app.get("/maps/new", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('users')
    .where('id', req.session.userid)
    .then(function (rows_user) {
      return res.status(200).render("new_map", {isLogged: true, username: rows_user[0].username});
    });
  } else {
    return res.redirect("/login");
  }
});

// *** Make sure empty/only spaces names and location are not passed
app.post("/maps", (req, res) => {
  if (req.session.userid) {

    knex.select('*').from('maps')
    .where('creator_id', req.session.userid)
    .then(function (rows_maps) {

      // The map_names array will hold onto every 'names' of maps that user has made
      const map_names = [];
      for (const row in rows_maps) {
        map_names.push(row.name);
      }

      if (!map_names.includes(req.body.name)) {
        // ** TODO: check if location is valid
        //***********************************
        // AND use API to find latitude/longitude data and also store them
        request('https://maps.googleapis.com/maps/api/geocode/json?address='+req.body.location+'&key=AIzaSyCo10UbMT49dBHndBvRsC8Xsy_n_TMsNVc', function (error, response, data) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

          var mLatitude = JSON.parse(data).results[0].geometry.location.lat;
          var mLongitude = JSON.parse(data).results[0].geometry.location.lng;

          const newMap = {
            location: req.body.location,
            name: req.body.name,
            creator_id: req.session.userid,
            latitude: mLatitude || 0,
            longitude: mLongitude || 0
          };

          knex('maps').insert([newMap])
          .then(function () {

            knex.select('*').from('maps')
            .where({
              creator_id: newMap.creator_id,
              name: newMap.name
            })
            .then(function (rows_new) {
              // rows_new is obtained to get the 'id' for the newly created map
              // similar to registering user
              return res.redirect(`/maps/${rows_new[0].id}`);
            });
          });
        });

      } else {
        // ** TODO: has to modify this error handling
        // Ex. make the form submit through AJAX so that an error message is displayed without
        // moving away from the 'maps/new' page
        return res.status(400).send("error: duplicate map name");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

app.get("/maps/:id", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('users')
    .where('id', req.session.userid)
    .then(function (rows_user) {

      knex.select('*').from('maps')
      .where('id', req.params.id)
      .then(function (rows) {
        return res.status(200).render("map_page", {map: rows[0], isLogged: true, username: rows_user[0].username});
      });
    });
  } else {
    return res.redirect("/login");
  }
});

app.put("/maps/:id", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('maps')
    .where('id', req.params.id)
    .then(function (rows_maps) {
      if (rows_maps[0].creator_id === req.session.userid) {
        // *** TODO: use API to set a new latitude and location if it is changed

      request('https://maps.googleapis.com/maps/api/geocode/json?address='+req.body.location+'&key=AIzaSyCo10UbMT49dBHndBvRsC8Xsy_n_TMsNVc', function (error, response, data) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        var nLatitude = JSON.parse(data).results[0].geometry.location.lat;
        var nLongitude = JSON.parse(data).results[0].geometry.location.lng;

        knex('maps')
        .where('id', req.params.id)
        .update({
          name: req.body.name || rows_maps[0].name,
          location: req.body.location || rows_maps[0].location,
          latitude: nLatitude || rows_maps[0].latitude,
          longitude: nLongitude || rows_maps[0].longitude,
        })
        .then(function () {
          return res.redirect(`/maps/${req.params.id}`);
        });

      });



      } else {
        // ** TODO: this can be fine as it is, ONLY IF the editing button is not shown for
        // users who are not the creator of the map, in the frontend side
        // Else, has to modify this error handling
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
    .where('id', req.params.id)
    .then(function (rows_maps) {

      if (rows_maps[0].creator_id === req.session.userid) {
        knex('maps')
        .where({
          creator_id: req.session.userid,
          name: rows_maps[0].name
        })
        .del()
        .then(function () {
          return res.redirect("/maps");
        });
      } else {
        // ** TODO: this can be fine as it is, ONLY IF the deleting button is not shown for
        // users who are not the creator of the map, in the frontend side
        // Else, has to modify this error handling
        return res.status(401).send("error: unauthorized");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

// ** Might not be needed in our web app design **
app.get("/users", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('users')
    .where('id', req.session.userid)
    .then(function (rows_user) {

      knex.select('username', 'email').from('users')
      .then(function (rows) {
        return res.status(200).render("users", {isLogged: true, username: rows_user[0].username, users: rows});
      });
    });
  } else {
    knex.select('username', 'email').from('users')
    .then(function (rows) {
      return res.status(200).render("users", {isLogged: false, username: "", users: rows});
    });
  }
});

app.get("/users/:username", (req, res) => {

  knex.select('maps.id AS mapid', 'location', 'name').from('maps')
  .innerJoin('users', 'creator_id', 'users.id')
  .where('username', req.params.username)
  .then(function (rows_created) {
    // rows_created
    knex.select('maps.id AS mapid', 'location', 'name').from('maps')
    .innerJoin('favourite_maps AS fm', 'maps.id', 'fm.map_id')
    .innerJoin('users', 'fm.user_id', 'users.id')
    .where('username', req.params.username)
    .then(function (rows_favourite) {
      // rows_favourite
      knex.distinct('maps.id AS mapid', 'location', 'name').select().from('maps')
      .innerJoin('contributors AS cn', 'maps.id', 'cn.map_id')
      .innerJoin('users', 'cn.user_id', 'users.id')
      .where('username', req.params.username)
      .then(function (rows_contributed) {

        if (req.session.userid) {
          knex.select('*').from('users')
          .where('id', req.session.userid)
          .then(function (rows_user) {
            return res.status(200).render("profile", {isLogged: true, username: rows_user[0].username, created: rows_created, favourite: rows_favourite, contributed: rows_contributed});
          });
        } else {
          return res.status(200).render("profile", {isLogged: false, username: "", created: rows_created, favourite: rows_favourite, contributed: rows_contributed});
        }
      });
    });
  });
});

// The following three routes are for the AJAX calls to get points table data

// The AJAX call from '/maps/:id' will get the data of all the points of the map
// from the $.ajax().then(function(data) {}) -> data will be an array of objects
// where each objects has 'data[i].pid, data[i].pname, data[i].image, data[i].details,
// data[i].plocation, data[i].platitude, and data[i].plongitude'.
// If call fails due to no user cookie, it will send one string 'fail', so data should be
// checked before making any access.
app.get("/maps/:id/points", (req, res) => {
  if (req.session.userid) {
    knex.select('points.id AS pid', 'points.name AS pname', 'image', 'details', 'points.location AS plocation', 'points.latitude AS platitude', 'points.longitude AS plongitude')
    .from('maps').innerJoin('points', 'maps.id', 'points.map_id')
    .where('maps.id', req.params.id)
    .then(function (rows_points) {
      return res.status(200).json(rows_points);
    });
  } else {
    return res.status(401).json("fail");
  }
});

// Need to pass in name, image, details in the form, name is required
// from the $.ajax().then(function(data) {}) -> data will be an object containing new point info
// where its properties are 'data.id, data.name, data.image, data.details, data.location,
// data.latitude, data.longitude'.
// If call fails due to no user cookie or having same map/name/location,
// it will send one string 'fail', so data should be checked before making any access.
app.post("/maps/:id/points", (req, res) => {
  if (req.session.userid) {
    if (req.body.name.replace(/\s/g, '').length && req.body.location.replace(/\s/g, '').length) {
      // ** TODO: check if location is valid
      //***********************************
      // AND use API to find latitude/longitude data and also store them
      var mLatitude;
      var mLongitude;

      const newPoint = {
        map_id: req.params.id,
        name: req.body.name,
        image: req.body.image || "",
        details: req.body.details || "",
        location: req.body.location,
        latitude: mLatitude || 0,
        longitude: mLongitude || 0
      };

      // Check if same name, same latitude and longitude point exists
      knex.select('*').from('points')
      .where({
        map_id: req.params.id,
        name: req.body.name,
        latitude: newPoint.latitude,
        longitude: newPoint.longitude
      })
      .then(function (rows_match) {

        if (!rows_match.length) {
          knex('maps').insert([newPoint])
          .then(function () {

            knex.select('*').from('points')
            .where(newPoint)
            .then(function (rows_new) {
              // rows_new[0] is the object with info about the new points created
              // also, insert current user as contributor to the map
              const contributed = {
                user_id: req.session.userid,
                map_id: req.params.id,
                point_id: rows_new[0].id
              };

              knex('contributors').insert([contributed])
              .then(function () {
                return res.status(200).json(rows_new[0]);
              });
            });
          });
        } else {
          // ** TODO: has to modify this error handling
          // Ex. make the AJAX receive 'fail' and handle error respectively
          res.status(400).json("fail");
        }
      });
    } else {
      // *** TODO: handle this error so that name/location input is required in HTML/EJS
      return res.status(400).send("error: need name/location for the points");
    }
  } else {
    return res.status(401).json("fail");
  }
});

// *** CHANGE FROM TRELLO: Changed these two PUT and DELETE route for the points.
// Make AJAX call specific to this url of the route
// The original url in trello is not applicable for updating or deleting points

app.put("/maps/:id/points/:pointID", (req, res) => {
  if (req.session.userid) {

    knex.select('*').from('points')
    .where({
      id: req.params.pointID,
      map_id: req.params.id
    })
    .then(function (rows_point) {

      // *** TODO: use API to set a new latitude and location if it is changed
      var nLatitude;
      var nLongitude;

      knex('points').where({
        id: req.params.pointID,
        map_id: req.params.id
      })
      .update({
        name: req.body.name || rows_point.name,
        location: req.body.location || rows_point.location,
        latitude: nLatitude || rows_point.latitude,
        longitude: nLongitude || rows_point.longitude,
      })
      .then(function () {
        return res.status(200).json("true"); // ** Could use this value, depending on how frontend is handled
        // might need 'return res.redirect(`/maps/${req.params.id}`);' instead
      });
    });

  } else {
    // ** TODO: this can be fine as it is, ONLY IF the editing button is not shown for
    // users who do not have cookies
    return res.status(401).json("false");
    // might need 'return res.redirect("/login");' instead
  }
});

// ** Make sure contributor table is also auto-updated
app.delete("/maps/:id/points/:pointID", (req, res) => {
  if (req.session.userid) {

    knex('points').where({
      id: req.params.pointID,
      map_id: req.params.id
    })
    .del()
    .then(function () {
      return res.status(200).json("true"); // ** In case you want to use this value.
      // Or 'return res.redirect(`/maps/${req.params.id}`)' might be what you want
    });
  } else {
    // ** TODO: this can be fine as it is, ONLY IF the deleting button is not shown for
    // users who do not have cookies
    return res.status(401).json("false");
    // might need 'return res.redirect("/login");' instead
  }
});


// The following two routes are for AJAX calls to favourite/unfavourite maps
// *** Two new routes, not from TRELLO

app.post("/maps/:id/favourite", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('favourite_maps')
    .where({
      user_id: req.session.userid,
      map_id: req.params.id
    })
    .then(function (rows_match) {
      if (!rows_match.length) {
        const newFav = {
          user_id: req.session.userid,
          map_id: req.params.id
        };

        knex('favourite_maps').insert([newFav])
        .then(function () {
          return res.status(200).json("true");
          // might not need this return value it is up to the frontend handling
        });
      } else {
        return res.status(400).json("false");
      }
    });
  } else {
    // ** TODO: this can be fine as it is, ONLY IF the favourite button is not shown for
    // users who do not have cookies
    return res.status(401).json("false");
    // might need 'return res.redirect("/login");' instead
  }
});

app.delete("/maps/:id/favourite", (req, res) => {
  if (req.session.userid) {
    knex.select('*').from('favourite_maps')
    .where({
      user_id: req.session.userid,
      map_id: req.params.id
    })
    .then(function (rows_match) {
      if (rows_match.length) {

        knex('favourite_maps').where({
          user_id: req.session.userid,
          map_id: req.params.id
        })
        .del()
        .then(function () {
          return res.status(200).json("true");
          // ** might not need this return value it is up to the frontend handling
        });
      } else {
        return res.status(400).json("false");
      }
    });
  } else {
    // ** TODO: this can be fine as it is, ONLY IF the favourite button is not shown for
    // users who do not have cookies
    return res.status(401).json("false");
    // might need 'return res.redirect("/login");' instead
  }
});

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
