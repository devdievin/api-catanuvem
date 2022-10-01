const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { scheduleTask } = require('./src/utils/tools');
const { collectCityCodesBrazil } = require('./src/controllers/cityCodesController');

const routes = require('./src/routes/indexRoute');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

scheduleTask('Collect city codes', [1, 3, 5], 04, 00, collectCityCodesBrazil);

app.listen(PORT, () => console.log(`Api running on port ${PORT}`));
