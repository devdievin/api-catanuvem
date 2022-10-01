const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/catanuvem', err => {
    if (err) throw err;
    console.log('connected to MongoDB')
});

module.exports = mongoose;
