const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env' });

const getWeather = async (req, res) => {
    // const TEMPERATURE_AMOUNT_TODAY = 4;
    // const TEMPERATURE_AMOUNT_HOUR_DAYS = 5;

    let response = await axios.get(process.env.URL_BASE);

    const $ = cheerio.load(response.data);

    let sun = $('.SunriseSunset--dateValue--N2p5B').text();
    let sunrise = sun.substring(0, sun.length - 5);
    let sunset = sun.slice(-5);

    let score = $('[data-testid="DonutChartValue"]').text();
    let quality = $('[data-testid="AirQualityCategory"]').text();
    let description = $('[data-testid="AirQualitySeverity"]').text();

    const weather = {
        location: $('h1.CurrentConditions--location--kyTeL').text(),
        temperature: $('span.CurrentConditions--tempValue--3a50n').text(),
        condition: $('.CurrentConditions--phraseValue--2Z18W').text(),
        wind: $('span.Wind--windWrapper--3aqXJ > :last-child')[0].next.data,
        humidity: $('span[data-testid="PercentageValue"]').text(),
        visibility: $('[data-testid="VisibilityValue"]').text(),
        moon: $('.TodayDetailsCard--detailsContainer--16Hg0 > :last-child > :last-child')[0].lastChild.data,
        airQuality: { score, quality, description },
        sun: { sunrise, sunset },
    };

    let arrTemps = [];

    $('[data-testid="SegmentHighTemp"] > span').map((index, element) => {
        arrTemps.push(element.firstChild.data);
    });

    console.log("Hoje: " + arrTemps.slice(0, 4));
    console.log("Hora: " + arrTemps.slice(4, 9));
    console.log("Dias: " + arrTemps.slice(9, 14));

    return res.send(weather);
}

// Criar um função para cada array de temperaturas

// 1ª - Função Temperatura de hoje: 4 (Manhã, Tarde, Noite, A noite)

// 2ª - Função Temperatura de horas: 5 (próximas 5 horas)

// 3ª - Função Temperatura de Dias: 5 (próximos 5 dias)

module.exports = { getWeather };