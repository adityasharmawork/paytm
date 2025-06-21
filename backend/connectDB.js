const mongoose = require('mongoose');
const MONGO_URI = require('./config');

const connectDB = async () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`MongoDB connected successfully!`);
    });
}

module.exports = connectDB;