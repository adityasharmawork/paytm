require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI
const PORT = 8080;

module.exports = {
    SECRET,
    MONGO_URI,
    PORT
}
