const City = require('../models/City');
const cities = require('../utils/cities.json');
const uf_codes = require('../utils/uf_codes.json');

const onlyCityName = async (req, res) => {
    const { city } = req.params;
    // console.log(city);

    cities.forEach(element => {
        let obj_code = uf_codes.filter(el => el.codigo_uf === element.codigo_uf)[0];
        element.sigla_uf = obj_code.sigla;
        element.estado = obj_code.estado;
    })

    console.log("Creating new documents. Hold!");
    await City.insertMany(cities);
    console.log('City codes saved in the database. Complete process!');
    // console.log(cities);

    res.send(cities);
}

const cityNameAndState = (req, res) => {
    const { city, state } = req.params;
    // console.log(city + ' AND ' + state);
    res.send({ city, state });
}

module.exports = { onlyCityName, cityNameAndState }