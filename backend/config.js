require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const PORT = 8080;

module.exports = {
    SECRET,
    PORT
}
