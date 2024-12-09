const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tutorials.db', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Successfully connected to SQLite database.");
    }
})

db.serialize(() => {
    let query = `
      CREATE TABLE IF NOT EXISTS tutorials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        published BOOLEAN DEFAULT false
      )
    `
    db.run(query, (err) => {
        if (err) {
            console.error("Error creating tutorials table:", err.message);
        } else {
            console.log("Tutorials table created successfully.");
        }
    });
});


module.exports = db;