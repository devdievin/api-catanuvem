const axios = require('axios').default;
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const City = require('../models/City');

dotenv.config({ path: "./src/config/.env" });

const collectCityCodesBrazil = async () => {
    try {
        const response = await axios.get(process.env.URL_CITY_CODE);
        const $ = cheerio.load(response.data);
        saveCityDataToDB(getData($));
    } catch (error) {
        console.error(error);
    }
}

const saveCityDataToDB = async (data) => {
    try {
        City.count(async (err, count) => {
            if (err) return console.error("Error:", err);
            else {
                console.log('Process of saving city codes in the database started...');
                if (count <= 0) {
                    console.log("Creating new documents. Hold!");
                    await City.insertMany(data);
                } else {
                    console.log("Cleaning and updating existing documents. Hold!");
                    await City.deleteMany();
                    await City.insertMany(data);
                }
                console.log('City codes saved in the database. Complete process!');
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

const getData = ($) => {
    try {
        let cities = [];
        $('.country__codes__letter > ul > li').map((index, element) => {
            cities.push({
                name: $(element).find(':first-child').text(),
                code: $(element).find(':last-child').text(),
            });
        });
        return cities;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getCityCode = async (name) => {
    try {
        const response = await City.findOne({ name });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { collectCityCodesBrazil, getCityCode }