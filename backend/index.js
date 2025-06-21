const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(cors);

app.get("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});