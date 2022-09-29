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
            forecastNextDays: getWeatherNextFiveDays($)
        };

        return res.send(weather);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.send({ error: error.message })
    }
}

const getWeatherNextFiveDays = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.DailyWeatherCard--TableWrapper--3mjsg');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 4);
    return convertArrayToForecastObjectDays(arrayDataList);
}

const convertArrayToForecastObjectDays = (arr) => {
    const obj = arr.map(([day, max, min, rain]) => ({ day, max, min, rainProbability: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeather }