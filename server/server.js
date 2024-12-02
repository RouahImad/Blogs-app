const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

const corsOptions = {
    origin: "https://blogs-app-bay.vercel.app",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }, // change to true later
    })
);

app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
