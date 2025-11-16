import fs from "fs";
import path from "path";
import pool from "../config/db";

const migrationsDir = path.join(__dirname, "sql");

async function runMigrations() {
    const connection = await pool.getConnection();

    try {

        await connection.query(`
          CREATE TABLE IF NOT EXISTS migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            filename VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
         `);


        const [rows]: any = await connection.query("SELECT filename FROM migrations");
        const executedMigrations = rows.map((row: any) => row.filename);

        const files = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort(); // ensure order

        for (const file of files) {
            if (!executedMigrations.includes(file)) {
                const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
                console.log(`Running migration: ${file}`);
                await connection.query(sql);
                await connection.query("INSERT INTO migrations (filename) VALUES (?)", [file]);
                console.log(`✅ Migration executed: ${file}`);
            } else {
                console.log(`⏭ Skipping already executed migration: ${file}`);
            }
        }

        console.log("All migrations are up to date!");
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    } finally {
        connection.release();
    }
}

runMigrations();
