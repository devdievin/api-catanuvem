const express = require('express');
const todayWeatherContoller = require('../controllers/todayWeatherContoller');
const daysWeatherContoller = require('../controllers/daysWeatherController');
const hoursWeatherContoller = require('../controllers/hoursWeatherController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Minha Api de previsão do tempo");
});

router.get('/weather/today/loc/:lat&:lon', todayWeatherContoller.getWeather);
router.get('/weather/days/loc/:lat&:lon', daysWeatherContoller.getWeather);
router.get('/weather/hours/loc/:lat&:lon', hoursWeatherContoller.getWeather);

// Implementar a busca pelos nomes de cidades
// https://weather.codes/brazil/

module.exports = router;