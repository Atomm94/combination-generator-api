"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("../config/db"));
const migrationsDir = path_1.default.join(__dirname, "sql");
async function runMigrations() {
    const connection = await db_1.default.getConnection();
    try {
        await connection.query(`
          CREATE TABLE IF NOT EXISTS migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            filename VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
         `);
        const [rows] = await connection.query("SELECT filename FROM migrations");
        const executedMigrations = rows.map((row) => row.filename);
        const files = fs_1.default
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort(); // ensure order
        for (const file of files) {
            if (!executedMigrations.includes(file)) {
                const sql = fs_1.default.readFileSync(path_1.default.join(migrationsDir, file), "utf8");
                console.log(`Running migration: ${file}`);
                await connection.query(sql);
                await connection.query("INSERT INTO migrations (filename) VALUES (?)", [file]);
                console.log(`✅ Migration executed: ${file}`);
            }
            else {
                console.log(`⏭ Skipping already executed migration: ${file}`);
            }
        }
        console.log("All migrations are up to date!");
    }
    catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
    finally {
        connection.release();
    }
}
runMigrations();
