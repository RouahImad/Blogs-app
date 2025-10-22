const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();
const app = express();
const routers = require("./routes/routes");
const cookieParser = require("cookie-parser");
const { pool } = require("./configure/db");

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = isProduction
    ? ["https://imadlog.vercel.app"]
    : ["http://127.0.0.1:5173", "http://localhost:5173"];

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(cookieParser());

app.options("*", (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || !isProduction) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.sendStatus(204);
    } else {
        res.sendStatus(403);
    }
});

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, curl requests)
            if (!origin) return callback(null, true);

            // Check if origin is allowed
            if (allowedOrigins.indexOf(origin) !== -1) {
                return callback(null, true);
            }

            // Otherwise, reject
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
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

app.use((req, _res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${
            req.originalUrl
        } - from ${req.ip}
        `
    );
    next();
});

app.use(express.json());
app.use(routers);

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) return console.error(err);
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to the database:", err);
            return;
        }
        console.log("Connected to the database.");
        connection.release();
    });
    console.log("server started at " + process.env.SERVER_PORT);
});
