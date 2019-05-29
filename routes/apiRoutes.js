/* eslint-disable prettier/prettier */
// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // eslint-disable-next-line prettier/prettier
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line indent
    res.json("/");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });


  app.post("/api/tolls", function (req) {
    console.log(req.body);
    var url = "https://dev.tollguru.com/beta00/calc/here"
    var data = {
      "from": {
        "address": req.body.start
      },
      "to": {
        "address": req.body.end
      }
    };
    var headers = { headers: { "x-api-key": "IOtM9YQrTQcKwsz9bffbalk65zx0lJo8X6tHmUW7" } };
    var cost = 0;
    axios.post(url, data, headers).then(function (response) {
      for (var x = 0; x < response.data.routes[0].tolls.length; x++) {
        var keys = Object.keys(response.data.routes[0].tolls[x]);
        var values = Object.values(response.data.routes[0].tolls[x]);
        if (String(values[10]) === "false" && String(keys[10] === "cashCost")) {
          // console.log(values[11]);
          cost = values[11] + cost;
          // console.log(cost);
        }
        if (String(keys[0]) === "type") {
          cost = values[4] + cost;
          // console.log(cost);
        }
        else {
          cost = values[10] + cost;
          // console.log(cost);
        }
      }
      console.log(cost);
    });

  });
  //
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


};