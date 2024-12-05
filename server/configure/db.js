const mysql = require("mysql2");
require("dotenv").config();

let configs = {};
if (process.env.NODE_ENV === "production") {
    configs = {
        host: process.env.PROD_HOST_NAME,
        user: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
    };
} else {
    configs = {
        host: process.env.HOST_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };
}

const pool = mysql.createPool(configs).promise();

module.exports = pool;
