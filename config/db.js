const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

function connect() {
    mongoose.connect(DB_URL, (res) => {
        console.log(`Successfully Connected to ${DB_URL}`);
    })
}

module.exports = connect;