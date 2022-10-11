const mongoose = require('../database/connection');

const CitySchema = new mongoose.Schema({
    codigo_ibge: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    capital: {
        type: Number,
        required: true
    },
    codigo_uf: {
        type: Number,
        required: true
    },
    sigla_uf: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    siafi_id:{
        type: Number,
        required: true
    },
    ddd: {
        type: Number,
        required: true
    },
    fuso_horario: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const City = mongoose.model('cities', CitySchema);

module.exports = City;