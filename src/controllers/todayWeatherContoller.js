const axios = require('axios').default;
const cheerio = require('cheerio');
const { removeAllLetters, domElementsListScraper, organizeElementDataDOM } = require('../utils/tools');

const getWeatherToday = async (url) => {
    try {
        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const weather = {
            location: $('h1.CurrentConditions--location--kyTeL').text(),
            // coordinates: { latitude: lat, longitude: lon },
            temperature: $('span.CurrentConditions--tempValue--3a50n').text(),
            condition: $('.CurrentConditions--phraseValue--2Z18W').text(),
            rainProbability: removeAllLetters($('.DailyWeatherCard--TableWrapper--3mjsg > ul > li:first-child > a > :last-child > span').text()),
            thermalSensation: $('[data-testid="FeelsLikeSection"] > [data-testid="TemperatureValue"]').text(),
            wind: $('span.Wind--windWrapper--3aqXJ > :last-child')[0].next.data,
            humidity: $('span[data-testid="PercentageValue"]').text(),
            dewPoint: $('[data-testid="WeatherDetailsListItem"]:nth-child(4) > .WeatherDetailsListItem--wxData--2s6HT > span').text(),
            visibility: $('[data-testid="VisibilityValue"]').text(),
            moon: $('.TodayDetailsCard--detailsContainer--16Hg0 > :last-child > :last-child')[0].lastChild.data,
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
    let temps = [];
    $('.TodayDetailsCard--detailsContainer--16Hg0 > :first-child .WeatherDetailsListItem--wxData--2s6HT > span[data-testid="TemperatureValue"]').map((index, element) => {
        temps.push(element.firstChild.data)
    })

    return { max: temps[0], min: temps[1] };
}

const getAirQualityData = ($) => {
    let score = $('[data-testid="DonutChartValue"]').text();
    let quality = $('[data-testid="AirQualityCategory"]').text();
    let description = $('[data-testid="AirQualitySeverity"]').text();

    return { score, quality, description };
}

const getSunData = ($) => {
    let sun = $('.SunriseSunset--dateValue--N2p5B').text();
    let sunrise = sun.substring(0, sun.length - 5);
    let sunset = sun.slice(-5);

    return { sunrise, sunset };
}

const getTodayForecast = ($) => {
    let elementsListScraperArray = domElementsListScraper($, '.TodayWeatherCard--TableWrapper--2kEPM');
    let arrayDataList = organizeElementDataDOM(elementsListScraperArray, 3);
    return convertArrayToForecastObjectToday(arrayDataList);
}

const convertArrayToForecastObjectToday = (arr) => {
    const obj = arr.map(([period, temperature, rain]) => ({ period, temperature, rainProbability: removeAllLetters(rain) }));
    return obj;
}

module.exports = { getWeatherToday };