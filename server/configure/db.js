const mysql = require("mysql2");

const pool = mysql
    .createPool({
        host: process.env.HOST_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();

module.exports = pool;
