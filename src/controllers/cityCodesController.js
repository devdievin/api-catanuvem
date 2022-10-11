const City = require('../models/City');

const getCityCode = async (name) => {
    try {
        const response = await City.find({ nome: name });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

const getCityWithState = async (name, state) => {
    try {
        const response = await City.findOne({ nome: name, sigla_uf: state });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { getCityCode, getCityWithState }