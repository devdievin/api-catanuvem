const dotenv = require('dotenv');
const { validateData } = require('../utils/validate');
const { getCityCode } = require('./cityCodesController');
const { getWeatherDays } = require('./daysWeatherController');
const { getWeatherHours } = require('./hoursWeatherController');
const { getWeatherToday } = require('./todayWeatherContoller');

dotenv.config({ path: './src/config/.env' });

// <----------------- Geolocation Search --------------------->
const locWeatherToday = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const url = `${process.env.URL_BASE}/${lat},${lon}`;
        res.send(await getWeatherToday(url));
    } catch (error) {
        console.error(error);
    }
}

const locWeatherHours = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const url = `${process.env.URL_BASE}/${lat},${lon}`;
        res.send(await getWeatherHours(url));
    } catch (error) {
        console.error(error);
    }
}

const locWeatherDays = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        console.log(`LAT: ${lat} | LON: ${lon}`);
        locResponseData(lat, lon, res, getWeatherDays);
    } catch (error) {
        console.error(error);
    }
}

const locResponseData = async (lat, lon, res, callback) => {
    if (validateData(lat) && validateData(lon)) {
        const url = `${process.env.URL_BASE}/${lat},${lon}`;
        res.send(await callback(url));
    } else {
        res.send({ error: 'Incorrect coordinates! Try again.' });
    }
}

// <----------------- City Name Search --------------------->
const cityWeatherToday = async (req, res) => {
    try {
        const { name } = req.params;
        const data = await getCityCode(name);
        cityResponseData(data, res, getWeatherToday);
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherHours = async (req, res) => {
    try {
        const { name } = req.params;
        const data = await getCityCode(name);
        cityResponseData(data, res, getWeatherHours);
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherDays = async (req, res) => {
    try {
        const { name } = req.params;
        const data = await getCityCode(name);
        cityResponseData(data, res, getWeatherDays);
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityResponseData = async (data, res, callback) => {
    if (validateData(data)) {
        const url = `${process.env.URL_BASE}/${data.code}`;
        res.send(await callback(url));
    } else {
        res.send({ error: 'City not found! Check the name or try by coordinates!' });
    }
}

module.exports = { locWeatherToday, locWeatherHours, locWeatherDays, cityWeatherToday, cityWeatherHours, cityWeatherDays }