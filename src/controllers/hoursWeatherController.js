const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

dotenv.config({ path: './src/config/.env' });

const getWeather = async (req, res) => {

    let response = await axios.get(process.env.URL_BASE);

    const $ = cheerio.load(response.data);

    const weather = {
        hoursForecast: getWeatherHours($)
    };

    return res.send(weather);
}

const getWeatherHours = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.HourlyWeatherCard--TableWrapper--1IGDr');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 3);
    return convertArrayToForecastObjectHours(arrayDataList);
}

const convertArrayToForecastObjectHours = (arr) => {
    const obj = arr.map(([hour, temperature, rain]) => ({ hour, temperature, probabilityRain: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeather };