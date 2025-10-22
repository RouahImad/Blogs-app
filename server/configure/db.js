const mysql = require("mysql2");
require("dotenv").config();

let configs = {
    host: process.env.HOST_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool(configs).promise();

module.exports = pool;
