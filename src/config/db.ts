import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "combination_db",
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
});

export default pool;
