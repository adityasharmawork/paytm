const express = require("express");
const userRouter = require("../routes/index");
const accountRouter = require("../routes/account");
const app = express();
const { PORT } = require('../config');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../connectDB');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));



app.use("/api/v1", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
    connectDB();
});