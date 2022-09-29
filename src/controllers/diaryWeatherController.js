const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

dotenv.config({ path: './src/config/.env' });

const getWeather = async (req, res) => {

    let response = await axios.get(process.env.URL_BASE);

    const $ = cheerio.load(response.data);

    const weather = {
        forecastNextDays: getWeatherNextFiveDays($)
    };

    return res.send(weather);
}

const getWeatherNextFiveDays = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.DailyWeatherCard--TableWrapper--3mjsg');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 4);
    return convertArrayToForecastObjectDiary(arrayDataList);
}

const convertArrayToForecastObjectDiary = (arr) => {
    const obj = arr.map(([day, max, min, rain]) => ({ day, max, min, probabilityRain: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeather }