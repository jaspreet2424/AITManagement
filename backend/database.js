const mongoose = require('mongoose');
const configJs = require('config-js');
const NODE_ENV = new configJs('./ait.config.js').get("ENV_VARIABLES");
const URI = NODE_ENV.DATABASE;

const connectDatabase = async() => {
    try {
        await mongoose.connect(URI);
        console.log(`AIT Expense Tracker Database is connected`);
    } catch (error) {
        console.log(`Error occured in connecting to database ${error.message}`);
    }
}

module.exports = connectDatabase;