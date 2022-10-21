const express = require('express');
const routeManagerController = require('../controllers/routeManagerController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Api Catanuvem - Previsão do Tempo");
});

router.get('/weather/today/loc/:lat&:lon', routeManagerController.locWeatherToday);
router.get('/weather/hours/loc/:lat&:lon', routeManagerController.locWeatherHours);
router.get('/weather/days/loc/:lat&:lon', routeManagerController.locWeatherDays);

router.get('/weather/today/city/:name/:state', routeManagerController.cityWeatherToday);
router.get('/weather/hours/city/:name/:state', routeManagerController.cityWeatherHours);
router.get('/weather/days/city/:name/:state', routeManagerController.cityWeatherDays);

router.get('/city/:name', routeManagerController.getCityData);

router.use((req, res, next) => {
    res.status(404).send({ error: "Sorry can't find that! This route does not exist.", status: "404" })
})

module.exports = router;