(async function() {
    "use strict"
    const mysql = require('mysql2/promise');
    require('dotenv').config({ path:`.env.${process.env.NODE_ENV}`});

    const dbName = process.env.DB_DATABASE;

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "root",
    })


    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.end();

    console.info("Database create or successfully checked");
    process.exit(0);
})();
