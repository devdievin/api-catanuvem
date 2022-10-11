const axios = require('axios').default;
const cheerio = require('cheerio');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

const getWeatherDays = async (url, searchType) => {
    try {
        let response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: (!searchType.byCity) ? $('h1.CurrentConditions--location--kyTeL').text() : searchType.cityName,
            forecastNextDays: getWeatherNextFiveDays($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getWeatherNextFiveDays = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.DailyWeatherCard--TableWrapper--3mjsg');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 5);
    return convertArrayToForecastObjectDays(arrayDataList);
}

const convertArrayToForecastObjectDays = (arr) => {
    const obj = arr.map(([day, max, min, icon, rain]) => ({ day, max, min, icon, precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherDays }