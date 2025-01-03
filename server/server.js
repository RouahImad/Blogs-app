const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = isProduction
    ? ["https://imadlog-bay.vercel.app"]
    : ["http://127.0.0.1:5173", "http://localhost:5173"];

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(
    cors({
        origin: allowedOrigins,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(
    cookieSession({
        name: "session",
        keys: [process.env.SESSION_SECRET],
        maxAge: 60000 * 60, // 1 hour
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
        httpOnly: true,
    })
);

app.use(express.json());
app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    console.log("server started at " + process.env.SERVER_PORT);
});
