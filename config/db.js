const mysql = require("mysql2/promise");



const pool = mysql.createPool({
    host: "localhost",
    database:"api_tickets_sale",
    user:"root",
    password:""
});

module.exports = pool;