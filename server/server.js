const express = require("express");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

app.use(express.json());
app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
