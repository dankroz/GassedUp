$(document).on("click", ".btn", function() {
    var value = $(this).attr("id");
var axios = require("axios")
flightUrl = "https://api.skypicker.com/aggregation_flights?fly_from=NYC&fly_to=SFO&v=3&date_from=08/08/2019&date_to=08/08/2019&return_from=10/08/2019&return_to=10/08/2019&flight_type=round&adults=1&children=0&partner=picky&partner_market=us&curr=USD&locale=en&price_from=1&price_to=10000&sort=price&asc=1&xml=0&&one_for_city=1&one_per_date=0"
axios.get(flightUrl,
    {
        headers: {
            "X-API-Version": "2",
            "Content-Type": "application/json",
        }
    }
).then(function (response) {
    console.log(response.data);
})
.catch(error => {
    console.log(error);
});
});