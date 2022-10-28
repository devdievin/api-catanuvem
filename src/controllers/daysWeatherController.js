const axios = require('axios').default;
const cheerio = require('cheerio');
const { returnIcon } = require('../utils/manageIcons');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM, returnCardModule } = require('../utils/tools');

const getWeatherDays = async (url, searchType) => {
    try {
        let response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: (!searchType.byCity) ? $('[data-testid="CurrentConditionsContainer"] > section > div > div > h1').text() : searchType.cityName,
            forecastNextDays: getWeatherNextFiveDays($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getWeatherNextFiveDays = ($, fields = 5) => {
    let elementsListScraperArray = domElementsListScraper($, returnCardModule('days'));
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, fields);
    return convertArrayToForecastObjectDays(arrayDataList);
}

const convertArrayToForecastObjectDays = (arr) => {
    const obj = arr.map(([day, max, min, icon, rain]) => ({ day, max, min, icon: returnIcon(icon), precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherDays }