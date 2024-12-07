const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

const isProduction = process.env.NODE_ENV === "production";

app.use(
    cors({
        origin: [
            "https://blogs-app-bay.vercel.app",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(
    cookieSession({
        name: "session",
        keys: [process.env.SESSION_SECRET],
        maxAge: 60000 * 60, // 1 hour
        // sameSite: isProduction ? "None" : "Lax", // Set sameSite to None only in production
        secure: isProduction, // Set secure to true only in production
        httpOnly: true,
    })
);

app.use(express.json());
app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
