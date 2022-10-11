const dotenv = require('dotenv');
const { convertToCamelCase } = require('../utils/tools');
const { validateData } = require('../utils/validate');
const { getCityWithState } = require('./cityCodesController');
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
        responseData(lat, lon, res, getWeatherDays);
    } catch (error) {
        console.error(error);
    }
}

// <----------------- City Name Search --------------------->
const cityWeatherToday = async (req, res) => {
    try {
        const { name, state } = req.params;
        const data = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        if (validateData(data)) {
            responseData(data.latitude, data.longitude, res, getWeatherToday);
        } else {
            res.send({ error: 'City not found! Try again.' });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherHours = async (req, res) => {
    try {
        const { name, state } = req.params;
        const data = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        if (validateData(data)) {
            responseData(data.latitude, data.longitude, res, getWeatherHours);
        } else {
            res.send({ error: 'City not found! Try again.' });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherDays = async (req, res) => {
    try {
        const { name, state } = req.params;
        const data = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        if (validateData(data)) {
            responseData(data.latitude, data.longitude, res, getWeatherDays);
        } else {
            res.send({ error: 'City not found! Try again.' });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const responseData = async (lat, lon, res, callback) => {
    if (validateData(lat) && validateData(lon)) {
        const url = `${process.env.URL_BASE}/${lat},${lon}`;
        res.send(await callback(url));
    } else {
        res.send({ error: 'Incorrect coordinates! Try again.' });
    }
}

module.exports = { locWeatherToday, locWeatherHours, locWeatherDays, cityWeatherToday, cityWeatherHours, cityWeatherDays }