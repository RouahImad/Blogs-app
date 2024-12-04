const express = require("express");
const session = require("cookie-session");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

app.use(
    cors({
        origin: ["https://blogs-app-bay.vercel.app", "http://127.0.0.1:5173"],
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "DELETE", "PUT"],
    })
);

app.use(express.json());

app.use(
    session({
        name: "session",
        keys: [process.env.SESSION_SECRET],
        secure: true, // change to true later for PROD
        httpOnly: true,
    })
);

app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
