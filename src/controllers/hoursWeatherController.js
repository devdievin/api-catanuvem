const axios = require('axios').default;
const cheerio = require('cheerio');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

const getWeatherHours = async (url) => {
    try {
        let response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: $('h1.CurrentConditions--location--kyTeL').text(),
            hoursForecast: getHoursForecast($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getHoursForecast = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.HourlyWeatherCard--TableWrapper--1IGDr');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 4);
    return convertArrayToForecastObjectHours(arrayDataList);
}

const convertArrayToForecastObjectHours = (arr) => {
    const obj = arr.map(([hour, temperature, icon, rain]) => ({ hour, temperature, icon, precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherHours };