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
        console.log('Process of saving city codes in the database started...');
        await City.create(data);
        console.log('City codes saved in the database!');
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

const checkCityCodesExist = async () => {
    try {
        City.count(async (err, count) => {
            if (err) return err.message;
            else {
                if (count <= 0) await collectCityCodesBrazil();
                else console.log("There are cities in the database! Total cities:", count);
            }
        });
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

const clearCityData = async (req, res) => {
    try {
        const response = await City.deleteMany();
        console.log("Cities collection droped");
        return res.send(response);
    } catch (error) {
        res.send({ error });
    }
}

module.exports = { collectCityCodesBrazil, checkCityCodesExist, getCityCode, clearCityData }