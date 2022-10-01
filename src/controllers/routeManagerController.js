const dotenv = require('dotenv');
const { getCityCode } = require('./cityCodesController');
const { getWeatherDays } = require('./daysWeatherController');
const { getWeatherHours } = require('./hoursWeatherController');
const { getWeatherToday } = require('./todayWeatherContoller');

dotenv.config({ path: './src/config/.env' });

// <----------------- Geolocation Search --------------------->
const locWeatherToday = async (req, res) => {
    const { lat, lon } = req.params;

    const url = `${process.env.URL_BASE}/${lat},${lon}`;

    res.send(await getWeatherToday(url));
}

const locWeatherHours = async (req, res) => {
    const { lat, lon } = req.params;

    const url = `${process.env.URL_BASE}/${lat},${lon}`;

    res.send(await getWeatherHours(url));
}

const locWeatherDays = async (req, res) => {
    const { lat, lon } = req.params;

    const url = `${process.env.URL_BASE}/${lat},${lon}`;

    res.send(await getWeatherDays(url));
}

// <----------------- City Name Search --------------------->
const cityWeatherToday = async (req, res) => {
    const { name } = req.params;

    const response = await getCityCode(name);

    const url = `${process.env.URL_BASE}/${response[0].code}`;

    res.send(await getWeatherToday(url));
}

const cityWeatherHours = async (req, res) => {
    const { name } = req.params;

    const response = await getCityCode(name);

    const url = `${process.env.URL_BASE}/${response[0].code}`;

    res.send(await getWeatherHours(url));
}

const cityWeatherDays = async (req, res) => {
    const { name } = req.params;

    const response = await getCityCode(name);

    const url = `${process.env.URL_BASE}/${response[0].code}`;

    res.send(await getWeatherDays(url));
}

module.exports = { locWeatherToday, locWeatherHours, locWeatherDays, cityWeatherToday, cityWeatherHours, cityWeatherDays }