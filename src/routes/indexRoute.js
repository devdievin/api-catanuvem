const express = require('express');
const path = require('path');
const { locWeatherToday, locWeatherHours, locWeatherDays, cityWeatherToday, cityWeatherHours, cityWeatherDays, getCityData } = require('../controllers/routeManagerController');

const router = express.Router();

router.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../pages/index.html')); });

router.get('/docs', (req, res) => { res.sendFile(path.join(__dirname, '../pages/docs.html')); });

router.get('/weather/today/loc/:lat&:lon', locWeatherToday);
router.get('/weather/hours/loc/:lat&:lon', locWeatherHours);
router.get('/weather/days/loc/:lat&:lon', locWeatherDays);

router.get('/weather/today/city/:name/:state', cityWeatherToday);
router.get('/weather/hours/city/:name/:state', cityWeatherHours);
router.get('/weather/days/city/:name/:state', cityWeatherDays);

router.get('/city/:name', getCityData);

router.use((req, res, next) => {
    res.status(404).send({ error: "Sorry can't find that! This route does not exist.", status: "404" })
})

module.exports = router;