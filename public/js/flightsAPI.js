// var axios = require("axios")
// var path = require("path");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
$(document).on("click", "#submit", function () {
    console.log(axios);
    var start = $("#start").val();
    var end = $("#end").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var passengers = $("#passengers").val();
    var mpg = $("#mpg").val();
    // var cityCodeAPI = "dd90a1cf-0df9-40bd-a48b-072177bf02a8"
    var code = "c57aa9-366c8a"
    var startCityCodeURL = "http://aviation-edge.com/v2/public/autocomplete?key=" + code + "&city=" + start
    var endCityCodeURL = "http://aviation-edge.com/v2/public/autocomplete?key=" + code + "&city=" + end

    axios.get(startCityCodeURL
    ).then(function (response) {
        var startObj = {
            startInfo: (response)
        }
        console.log(startObj.startInfo)
        axios.get(endCityCodeURL
        ).then(function (response) {
            var endObj = {
                endInfo: (response)
            }
            console.log(endObj.endInfo)

            startAPI = startObj.startInfo.data.cities[0].codeIataCity
            endAPI = endObj.endInfo.data.cities[0].codeIataCity
            var flightUrl = "https://api.skypicker.com/aggregation_flights?fly_from=" + startAPI + "&fly_to=" + endAPI + "&v=3&date_from=" + startDate + "&date_to=" + startDate + "&return_from=" + endDate + "&return_to=" + endDate + "&flight_type=round&adults=" + passengers + "&children=0&fly_days=[0,1,2,3,4,5,6]&fly_days_type=departure&ret_fly_days=[0,1,2,3,4,5,6]&ret_fly_days_type=departure&only_working_days=0&only_weekends=0&partner_market=us&curr=USD&locale=en&one_for_city=1&one_per_date=1&max_stopovers=1"
            axios.get(flightUrl,
                {
                    headers: {
                        "X-API-Version": "2",
                        "Content-Type": "application/json",
                    }
                }
            ).then(function (response) {
                console.log(startAPI)
                console.log(endAPI)
                console.log(flightUrl)
                console.log(response.data.data[0].price);
                $("#directions-panel").append("Flight Price " + "$" + response.data.data[0].price)
            }).catch(error => {
                console.log(error);
            });
        })
    })
    $('html, body').animate({
        scrollTop: $("#divBreak").offset().top
    }, 3000);
})


// axios.get(startCityCodeURL, endCityCodeURL
// ).then(function (response) {
//     // console.log(response);
//     var startAPI = response.data.cities[0].codeIataCity
//     var endAPI = response.data.cities[0].codeIataCity
//     var flightUrl = "https://api.skypicker.com/aggregation_flights?fly_from=" + startAPI + "&fly_to=" + endAPI + "&v=3&date_from=" + startDate + "&date_to=" + endDate + "&return_from=" + startDate + "&return_to=" + endDate + "&flight_type=round&adults=" + passengers + "&children=0&partner=picky&partner_market=us&curr=USD&locale=en&price_from=1&price_to=10000&sort=price&asc=1&xml=0&&one_for_city=1&one_per_date=0"
//     axios.get(flightUrl,
//         {
//             headers: {
//                 "X-API-Version": "2",
//                 "Content-Type": "application/json",
//             }
//         }
//     ).then(function (response) {
//         console.log(startAPI)
//         console.log(endAPI)
//         console.log(response.data);
//     })
//         .catch(error => {
//             console.log(error);
//         });
// })

//         // axios.get(endCityCodeURL
//         // ).then(function (response) {
//         //     console.log(response);
//         // })


//     })

