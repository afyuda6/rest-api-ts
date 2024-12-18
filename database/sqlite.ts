import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../rest_api_ts.db');

const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err: Error | null) => {
        if (err) {
            console.error('SQL error (connect database):', err);
        } else {
            initializeDatabase();
        }
    }
);

const initializeDatabase = (): void => {
    db.run(`DROP TABLE IF EXISTS users`, (err: Error | null) => {
    });
    db.run(`CREATE TABLE IF NOT EXISTS users
            (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            )`, (err: Error | null) => {
    });
};

export default db;
