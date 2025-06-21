const express = require("express");
const rootRouter = require("./routes");
const app = express();
const PORT = 8080;


app.get("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});