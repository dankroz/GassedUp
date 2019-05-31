$(document).ready(function () {

  $.get("/api/user_data").then(function (data) {
    if (data.email !== "undefined") {
      $("#signin").text(data.email);
      // $("#logout").style.display === "block";
    }
    if (data.email === null) {
      console.log("nobody logged in");
    }
  });


  $("#submit").click(function (event) {
    event.preventDefault();
    console.log("hello");
    var trip = {
      start: $("#start").val().trim(),
      end: $("#end").val().trim(),
      tollkey: config.tollkey
    };

    calcTolls(trip.start, trip.end, trip.tollkey);
  });

  function calcTolls(start, end, tollkey) {
    $.post("/api/tolls", {
      start: start,
      end: end,
      tollkey: tollkey
    }).then(function (res) {
      console.log("states with tolls " + res.states)
      $("#directions-panel").append("<p>Total Toll Cost: $" + parseInt(res.cost, 10) + "</p>");
      $("#directions-panel").append("<p>Avg Gas Cost: $" + res.gasprice + "/gallon</p>");
      $("#gasprice").append(res.gasprice);
      $("#tolls").append(res.cost);

      var dist = parseFloat((($("#distance").text()).slice(0, -3)).replace(/,/g, ""))
      console.log(dist)

      var gallons = dist / parseFloat($("#mpg").val().trim())
      console.log(gallons)

      

      var tripTotal = (gallons * parseFloat(res.gasprice)) + res.cost
      console.log("total road trip cost: $" + tripTotal);

      $("#roadtrip").append("Total Road Trip Cost: $" + tripTotal);

    });
  }

  
 
  // eslint-disable-next-line prettier/prettier
});