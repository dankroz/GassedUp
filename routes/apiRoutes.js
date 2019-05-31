// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
var scraper = require("../scrape");
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // eslint-disable-next-line prettier/prettier
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line indent
    res.json("/");
  });

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

  app.post("/api/distance", function(req, res) {
    var distance = req.body.distance;
    res.json({
      distance: distance
    })
  });


  app.post("/api/tolls", function (req, res) {
    var url = "https://dev.tollguru.com/beta00/calc/gmaps"
    var data = {
      "from": {
        "address": req.body.start
      },
      "to": {
        "address": req.body.end
      }
    };
    var headers = { headers: { "x-api-key": req.body.tollkey } };
    var cost = 0;
    const states = [];
    axios.post(url, data, headers).then(function (response) {

      for (var x = 0; x < response.data.routes[0].tolls.length; x++) {

        var keys = Object.keys(response.data.routes[0].tolls[x]);
        var values = Object.values(response.data.routes[0].tolls[x]);

        if (String(values[10]) === "false" && String(keys[10] === "cashCost")) {
          cost = values[11] + cost;
          states.push(values[5])

        }
        if (String(keys[0]) === "type") {
          cost = values[4] + cost;
          states.push(values[14].state)

        }
        else {
          cost = values[10] + cost;
          states.push(values[5])
        }
      }
      console.log("Tolls cost " + cost);
      var finalstates = [...new Set(states)];
      
      // Getting gas data from states with tolls
      scraper.getData().then((gasObj) => {
        var prices = []
        var places = Object.entries(gasObj);
        for (var i = 0; i < finalstates.length; i++) {
          var state = finalstates[i].replace(/ /gi, "_");
          for (var g = 0; g < places.length; g++) {
            if (state === places[g][0]) {
              prices.push(places[g][1])
            }
          }
        }
        console.log(prices)
        var arrPrices = [];
        prices.forEach(function (x) {
          var newp = x.slice(1);
          console.log(newp)
          arrPrices.push(newp)
        })
        var arrNum = arrPrices.map(Number);
        console.log(arrNum)
        var getAvg = array => array.reduce((prev, curr) => prev + curr) / array.length;
        var avg = getAvg(arrNum);
        var avgPrice = avg.toFixed(2);
        console.log(avgPrice)

        res.json({
          cost: cost,
          states: finalstates,
          gasprice: avgPrice
        });


      });
      
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