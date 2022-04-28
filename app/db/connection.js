const mysql = require("mysql2");
const { dbConfig } = require("../../.env");

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
