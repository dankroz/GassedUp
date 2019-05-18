const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://gasprices.aaa.com/state-gas-price-averages/";


// getting the request to the AAA website using Axios for response data
axios.get(url)
    .then(response => {
        // console.log(response.data);
        getData(response.data);
    })
    .catch(error => {
        console.log(error);
    })


// Here, I am beginning the cheerio function for data parsing
let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    // looking through the sortable-table (or i think it is from the html)
    $(".sortable-table tr").each((i, elem) => {
        // we will need state, regular, mid_grade, premium, and diesel.  Those are the HTML classes from AAA's website
        // looks like the AAA website uses anchor tag for state names, then each gas price we can pull out by class name
        data.push({
            state: $(elem).find('a').text().slice(3).trim(),
            regular: $(elem).find('td.regular').text(),
            mid_grade: $(elem).find('td.mid_grade').text(),
            premium: $(elem).find('td.premium').text(),
            diesel: $(elem).find('td.diesel').text()
        });
    });
    console.log(data);
}

