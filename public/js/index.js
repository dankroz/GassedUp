/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
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
      tollkey: "4jtthb2Nyu8jqkhzM1dXy3SIu3wnefCj2f1OuPEF"
    };

    calcTolls(trip.start, trip.end, trip.tollkey);
  });

  function calcTolls(start, end, tollkey) {
    $.post("/api/tolls", {
      start: start,
      end: end,
      tollkey: tollkey
    }).then(function (res) {
      //   $.get("/api/tolls").then(function(data) {
      //   console.log(data.cost);
      //   $("#directions-panel").append(data.cost);
      // });
      console.log("frontend" + res.cost);
      $("#directions-panel").append("<p>Total Toll Cost: $" + parseInt(res.cost) + "</p>");

    });
  }
  // eslint-disable-next-line prettier/prettier
});