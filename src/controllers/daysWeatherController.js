const axios = require('axios').default;
const cheerio = require('cheerio');
const { returnIcon } = require('../utils/manageIcons');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM, returnCardIndex } = require('../utils/tools');

const getWeatherDays = async (url, searchType) => {
    try {
        let response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: (!searchType.byCity) ? $('main > div > main > div > div > section > div > div > h1').text() : searchType.cityName,
            forecastNextDays: getWeatherNextFiveDays($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getWeatherNextFiveDays = ($) => {
    let elementsListScraperArray = domElementsListScraper($, returnCardIndex('days'));
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 5);
    return convertArrayToForecastObjectDays(arrayDataList);
}

const convertArrayToForecastObjectDays = (arr) => {
    const obj = arr.map(([day, max, min, icon, rain]) => ({ day, max, min, icon: returnIcon(icon), precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherDays }