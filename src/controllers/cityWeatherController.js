const axios = require('axios').default;
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const City = require('../models/City');

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
        await City.create(data);
        console.log('City data saved in the database');
    } catch (error) {
        console.error(error.message);
    }
}

const getData = ($) => {
    let cities = [];
    $('.country__codes__letter > ul > li').map((index, element) => {
        cities.push({
            name: $(element).find(':first-child').text(),
            code: $(element).find(':last-child').text(),
        });
    });

    return cities;
}

const index = async (req, res) => {
    try {
        const response = await City.find({});
        return res.send(response);
    } catch (error) {
        return res.send({ error });
    }
}

const clearCityData = async (req, res) => {
    try {
        const response = await City.deleteMany();
        return res.send(response);
    } catch (error) {
        res.send({ error });
    }
}

module.exports = { index, clearCityData, collectCityCodesBrazil }