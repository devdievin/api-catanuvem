const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { removeAllLetters } = require('../utils/tools');

dotenv.config({ path: './src/config/.env' });

const getWeather = async (req, res) => {

    let response = await axios.get(process.env.URL_BASE);

    const $ = cheerio.load(response.data);

    const weather = {
        location: $('h1.CurrentConditions--location--kyTeL').text(),
        temperature: $('span.CurrentConditions--tempValue--3a50n').text(),
        condition: $('.CurrentConditions--phraseValue--2Z18W').text(),
        thermalSensation: $('[data-testid="FeelsLikeSection"] > [data-testid="TemperatureValue"]').text(),
        wind: $('span.Wind--windWrapper--3aqXJ > :last-child')[0].next.data,
        humidity: $('span[data-testid="PercentageValue"]').text(),
        dewPoint: $('[data-testid="WeatherDetailsListItem"]:nth-child(4) > .WeatherDetailsListItem--wxData--2s6HT > span').text(),
        visibility: $('[data-testid="VisibilityValue"]').text(),
        moon: $('.TodayDetailsCard--detailsContainer--16Hg0 > :last-child > :last-child')[0].lastChild.data,
        climateVariation: getMaxMinTemperatureData($),
        airQuality: getAirQualityData($),
        sun: getSunData($),
        forecastNextDays: getWeatherNextFiveDays($)
    };

    return res.send(weather);
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

const getWeatherNextFiveDays = ($) => {
    let parentElementArray = [], childElementsArray = [];

    $('.DailyWeatherCard--TableWrapper--3mjsg').find('ul > li > a').each((index, element) => {
        parentElementArray.push($(element));

        $(parentElementArray[index]).find('span:not(.Accessibility--visuallyHidden--2uGW3)').each((index, element) => {
            childElementsArray.push($(element).text());
        });
    });
    return organizeDailyDataArray(childElementsArray);
}

const organizeDailyDataArray = (arr) => {
    const NUMBER_OBJECT_FIELDS = 4;
    let arrTemp = [];
    let arrDailyData = [];
    let count = 0;

    for (let index = 0; index <= arr.length; index++) {
        if (count === NUMBER_OBJECT_FIELDS) {
            arrDailyData.push(arrTemp);
            arrTemp = [];
            count = 0;
        }
        arrTemp.push(arr[index]);
        count++;
    }

    return convertArrayToForecastObject(arrDailyData);
}

const convertArrayToForecastObject = (arr) => {
    const obj = arr.map(([day, max, min, rain]) => ({ day, max, min, probabilityRain: removeAllLetters(rain) }));
    return obj;
}

// Criar um função para cada array de temperaturas

// 1ª - Função Temperatura de hoje: 4 (Manhã, Tarde, Noite, A noite)

// 2ª - Função Temperatura de horas: 5 (próximas 5 horas)

// Previsão de Chuva para hoje

module.exports = { getWeather };