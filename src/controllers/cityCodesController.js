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

const checkCityCodesExist = async (req, res) => {
    try {
        City.count((err, count) => {
            if (err) return res.send({ "error": err.message });
            else {
                if (count <= 0) res.send({ "status": "VAZIO" });
                else res.send({ count });
            }
        });
    } catch (error) {
        return res.send({ "error": error.message });
    }
}

const getCityCode = async (name) => {
    try {
        const response = await City.find({ name });
        return response;
    } catch (error) {
        console.error(error.message);
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

module.exports = { collectCityCodesBrazil, checkCityCodesExist, getCityCode, clearCityData }