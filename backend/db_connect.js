/** 
 * Connecting to the database
*/
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Add variables connection to .env file
dotenv.config();

const dbConnection = mysql.createConnection({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    port            : process.env.DB_PORT,
    database        : process.env.DB_NAME
});

dbConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySql with id: " + dbConnection.threadId );
});

module.exports = dbConnection;