const express = require('express');
const weatherContoller = require('../controllers/weatherContoller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Api de previsão do tempo");
});

router.get('/previsao', weatherContoller.getWeather);

module.exports = router;