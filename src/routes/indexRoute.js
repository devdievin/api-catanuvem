const express = require('express');
const routeManagerController = require('../controllers/routeManagerController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Api Catanuvem - Previsão do Tempo");
});

router.get('/weather/today/loc/:lat&:lon', routeManagerController.locWeatherToday);
router.get('/weather/hours/loc/:lat&:lon', routeManagerController.locWeatherHours);
router.get('/weather/days/loc/:lat&:lon', routeManagerController.locWeatherDays);

router.get('/weather/today/city/:name', routeManagerController.cityWeatherToday);
router.get('/weather/hours/city/:name', routeManagerController.cityWeatherHours);
router.get('/weather/days/city/:name', routeManagerController.cityWeatherDays);

module.exports = router;