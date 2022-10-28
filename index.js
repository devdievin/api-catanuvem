const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./src/routes/indexRoute');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => console.log(`Api running on port ${PORT}`));