const dotenv = require('dotenv');
const City = require('../models/City');
const { convertToCamelCase } = require('../utils/tools');
const { validateData } = require('../utils/validate');
const { getWeatherDays } = require('./daysWeatherController');
const { getWeatherHours } = require('./hoursWeatherController');
const { getWeatherToday } = require('./todayWeatherContoller');

dotenv.config({ path: './src/config/.env' });

// <----------------- Geolocation Search --------------------->
const locWeatherToday = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        responseData(lat, lon, res, getWeatherToday);
    } catch (error) {
        console.error("Error:", error);
    }
}

const locWeatherHours = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        responseData(lat, lon, res, getWeatherHours);
    } catch (error) {
        console.error("Error:", error);
    }
}

const locWeatherDays = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        responseData(lat, lon, res, getWeatherDays);
    } catch (error) {
        console.error("Error:", error);
    }
}

// <----------------- City Name Search --------------------->
const cityWeatherToday = async (req, res) => {
    try {
        const { name, state } = req.params;
        const city = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        responseCityData(city, res, getWeatherToday);
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherHours = async (req, res) => {
    try {
        const { name, state } = req.params;
        const city = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        responseCityData(city, res, getWeatherHours);
    } catch (error) {
        console.error("Error:", error);
    }
}

const cityWeatherDays = async (req, res) => {
    try {
        const { name, state } = req.params;
        const city = await getCityWithState(convertToCamelCase(name), state.toUpperCase());
        responseCityData(city, res, getWeatherDays);
    } catch (error) {
        console.error("Error:", error);
    }
}

const getCityWithState = async (name, state) => {
    try {
        const response = await City.findOne({ nome: name, sigla_uf: state });
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

const responseData = async (lat, lon, res, callback) => {
    if (validateData(lat) && validateData(lon)) {
        const url = `${process.env.URL_BASE}/${lat},${lon}`;
        res.send(await callback(url, { byCity: false, cityName: null }));
    } else {
        res.send({ error: 'Incorrect coordinates! Try again.' });
    }
}

const responseCityData = async (city, res, callback) => {
    if (validateData(city)) {
        const url = `${process.env.URL_BASE}/${city.latitude},${city.longitude}`;
        res.send(await callback(url, { byCity: true, cityName: `${city.nome}, ${city.estado}` }));
    } else {
        res.send({ error: 'City not found! Try again.' });
    }
}

module.exports = { locWeatherToday, locWeatherHours, locWeatherDays, cityWeatherToday, cityWeatherHours, cityWeatherDays }