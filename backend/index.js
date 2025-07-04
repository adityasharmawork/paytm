const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const { PORT } = require('./config');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./connectDB');

app.use(cors());
app.use(express.json());



app.use("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
    connectDB();
});