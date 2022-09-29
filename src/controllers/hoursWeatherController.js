const axios = require('axios').default;
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

dotenv.config({ path: './src/config/.env' });

const getWeather = async (req, res) => {
    try {
        const { lat, lon } = req.params;

        let response = await axios.get(`${process.env.URL_BASE}/${lat},${lon}`);

        const $ = cheerio.load(response.data);

        const weather = {
            location: $('h1.CurrentConditions--location--kyTeL').text(),
            coordinates: { latitude: lat, longitude: lon },
            hoursForecast: getWeatherHours($)
        };

        return res.send(weather);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.send({ error: error.message })
    }
}

const getWeatherHours = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.HourlyWeatherCard--TableWrapper--1IGDr');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 3);
    return convertArrayToForecastObjectHours(arrayDataList);
}

const convertArrayToForecastObjectHours = (arr) => {
    const obj = arr.map(([hour, temperature, rain]) => ({ hour, temperature, rainProbability: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeather };