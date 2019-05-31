// this file will scrape the AAA website to pull the updated daily gas prices per state and type
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://gasprices.aaa.com/state-gas-price-averages/";


// Here, I am beginning the cheerio function for data parsing
let getData = () => {
    return new Promise((resolve, reject) => {
        // getting the request to the AAA website using Axios for response data
        axios.get(url)
            .then(response => {
                parseData(response.data);
                //module exporting as object for other files to use later
                // module.exports = data;
            })
            .catch(error => {
                console.log(error);
            })
        function parseData(html) {
            data = [];
            const $ = cheerio.load(html);
            // looking through the sortable-table (or i think it is from the html)
            $(".sortable-table tr").each((i, elem) => {
                // we will need state, regular, mid_grade, premium, and diesel.  Those are the HTML classes from AAA's website
                // looks like the AAA website uses anchor tag for state names, then each gas price we can pull out by class name
                data.push({
                    state: $(elem).find('a').text().slice(3).trim(),
                    regular: $(elem).find('td.regular').text().trim(),
                    mid_grade: $(elem).find('td.mid_grade').text().trim(),
                    premium: $(elem).find('td.premium').text().trim(),
                    diesel: $(elem).find('td.diesel').text().trim()
                });

            });

            // creating object for gas price per state 

            var gasObj = {
                Alaska: data[1].regular,
                Alabama: data[2].regular,
                Arkansas: data[3].regular,
                Arizona: data[4].regular,
                California: data[5].regular,
                Colorodo: data[6].regular,
                Connecticut: data[7].regular,
                District_of_Columbia: data[8].regular,
                Delaware: data[9].regular,
                Florida: data[10].regular,
                Georgia: data[11].regular,
                Hawaii: data[12].regular,
                Iowa: data[13].regular,
                Idaho: data[14].regular,
                Illinois: data[15].regular,
                Indiana: data[16].regular,
                Kansas: data[17].regular,
                Kentucky: data[18].regular,
                Louisiana: data[19].regular,
                Massachusetts: data[20].regular,
                Maryland: data[21].regular,
                Maine: data[22].regular,
                Mighigan: data[23].regular,
                Minnesota: data[24].regular,
                Missouri: data[25].regular,
                Mississippi: data[26].regular,
                Montana: data[27].regular,
                North_Carolina: data[28].regular,
                North_Dakota: data[29].regular,
                Nebraska: data[30].regular,
                New_Hampshire: data[31].regular,
                New_Jersey: data[32].regular,
                New_Mexico: data[33].regular,
                Nevada: data[34].regular,
                New_York: data[35].regular,
                Ohio: data[36].regular,
                Oklahoma: data[37].regular,
                Oregon: data[38].regular,
                Pennsylvania: data[39].regular,
                Rhode_Island: data[40].regular,
                South_Carolina: data[41].regular,
                Tennessee: data[42].regular,
                Texas: data[43].regular,
                Utah: data[44].regular,
                Virginia: data[45].regular,
                Vermont: data[46].regular,
                Washington: data[47].regular,
                Wisconsin: data[48].regular,
                West_Virginia: data[49].regular,
                Wyoming: data[50].regular
            }
            // console.log(gasObj)
            resolve(gasObj)
        }
    })
    // console.log(gasObj.Wyoming);
}
module.exports = { getData };