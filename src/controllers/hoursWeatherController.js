const axios = require('axios').default;
const cheerio = require('cheerio');
const { returnIcon } = require('../utils/manageIcons');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM, returnCardModule } = require('../utils/tools');

const getWeatherHours = async (url, typeSearch) => {
    try {
        let response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: (!typeSearch.byCity) ? $('[data-testid="CurrentConditionsContainer"] > section > div > div > h1').text() : typeSearch.cityName,
            hoursForecast: getHoursForecast($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getHoursForecast = ($, fields = 4) => {
    let elementsListScraperArray = domElementsListScraper($, returnCardModule('hours'));
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, fields);
    return convertArrayToForecastObjectHours(arrayDataList);
}

const convertArrayToForecastObjectHours = (arr) => {
    const obj = arr.map(([hour, temperature, icon, rain]) => ({ hour, temperature, icon: returnIcon(icon), precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherHours };