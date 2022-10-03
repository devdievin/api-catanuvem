const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: "./src/config/.env" });

mongoose.connect(process.env.URI_DB, err => {
    if (err) throw err;
    console.log('connected to MongoDB')
});

module.exports = mongoose;
