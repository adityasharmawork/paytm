const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const PORT = 8080;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});