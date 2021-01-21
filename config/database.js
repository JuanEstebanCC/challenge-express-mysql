const mysql = require('mysql2');
require('dotenv').config();

const connection_mysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports ={
    cnn_mysql: connection_mysql
};