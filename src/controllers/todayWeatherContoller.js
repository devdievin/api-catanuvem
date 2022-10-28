const axios = require('axios');
const cheerio = require('cheerio');
const { returnIcon } = require('../utils/manageIcons');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM, returnCardIndex } = require('../utils/tools');

const getWeatherToday = async (url, typeSearch) => {
    try {
        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: (!typeSearch.byCity) ? $('main > div > main > div > div > section > div > div > h1').text() : typeSearch.cityName,
            temperature: $('main > div > main > div > div > section > div > div > div > div > span').text(),
            condition: $('main > div > main > div > div > section > div > div > div > div > :nth-child(2)').text(),
            dayAndNight: $('main > div > main > div > div > section > div > div > div > div > :nth-child(3)').text(),
            icon: returnIcon($('main > div > main > div > div > section > div > div > div > :last-child > svg > title').text()),
            precipitation: $('main > div > main > :nth-child(6) > section > div > ul > li:first-child > a > :last-child > span').clone().children().remove().end().text(),
            feelsLike: $('main > div > main > :nth-child(4) > section > div > div > span:first-child').text(),
            wind: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(2) > :last-child > span').clone().children().remove().end().text(),
            humidity: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(3) > :last-child > span').text(),
            dewPoint: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(4) > :last-child > span').text(),
            pressure: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(5) > :last-child > span').children().remove().end().text(),
            uvIndex: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(6) > :last-child > span').text(),
            visibility: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(7) > :last-child > span').text(),
            moon: $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(8) > :last-child').text(),
            climateVariation: getMaxMinTemperatureData($),
            airQuality: getAirQualityData($),
            sun: getSunData($),
            todayForecast: getTodayForecast($)
        };

        return weather;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return error.message;
    }
}

const getMaxMinTemperatureData = ($) => {
    let max = $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(1) > :last-child > span:first-child').text();
    let min = $('main > div > main > :nth-child(4) > section > :nth-child(3) > :nth-child(1) > :last-child > span:last-child').text();

    return { max, min };
}

const getAirQualityData = ($) => {
    let score = $('[data-testid="DonutChartValue"]').text();
    let quality = $('[data-testid="AirQualityCategory"]').text();
    let description = $('[data-testid="AirQualitySeverity"]').text();

    return { score, quality, description };
}

const getSunData = ($) => {
    let sunrise = $('main > div > main > :nth-child(4) > section > :nth-child(2) > :last-child > div > div > :nth-child(2) > :first-child > p').text();
    let sunset = $('main > div > main > :nth-child(4) > section > :nth-child(2) > :last-child > div > div > :nth-child(2) > :last-child > p').text();

    return { sunrise, sunset };
}

const getTodayForecast = ($) => {
    let elementsListScraperArray = domElementsListScraper($, returnCardIndex('today'));
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 4);
    return convertArrayToForecastObjectToday(arrayDataList);
}

const convertArrayToForecastObjectToday = (arr) => {
    const obj = arr.map(([period, temperature, icon, rain]) => ({ period, temperature, icon: returnIcon(icon), precipitation: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherToday };