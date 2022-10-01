const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/catanuvem', err => {
    if (err) throw err;
    console.log('connected to MongoDB')
});

// Padrão para todo projeto que criarmos
// mongoose.Promise = global.Promise;

module.exports = mongoose;
