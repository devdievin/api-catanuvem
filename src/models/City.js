const mongoose = require('../database/connection');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
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