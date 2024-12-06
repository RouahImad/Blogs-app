const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

// CORS configuration
app.use(
    cors({
        origin: [
            "https://blogs-app-bay.vercel.app",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true, // Allow credentials (cookies) to be sent in CORS requests
    })
);

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "testing",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
            sameSite: "lax", // Ensure proper handling of cookies
        },
    })
);

app.use(express.json());
app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
