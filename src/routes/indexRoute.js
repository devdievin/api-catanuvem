const express = require('express');
const todayWeatherContoller = require('../controllers/todayWeatherContoller');
const diaryWeatherContoller = require('../controllers/diaryWeatherController');
const hoursWeatherContoller = require('../controllers/hoursWeatherController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Api de previsão do tempo");
});

router.get('/previsao', todayWeatherContoller.getWeather);
router.get('/previsao/dias', diaryWeatherContoller.getWeather);
router.get('/previsao/horas', hoursWeatherContoller.getWeather);

module.exports = router;