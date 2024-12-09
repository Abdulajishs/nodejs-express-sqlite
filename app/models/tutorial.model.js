const db = require("./db");

// Constructor for the Tutorial object
class Tutorial {
  constructor(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  }
  // Create a new Tutorial
  static create(newTutorial, result) {
    const query = `INSERT INTO tutorials (title, description, published) 
    VALUES (?, ?, ?)`;
    const values = [newTutorial.title, newTutorial.description, newTutorial.published];

    db.run(query, values, function (err) {
      if (err) {
        console.error("Error inserting data:", err.message);
        result(err, null);
        return;
      }

      console.log("Created tutorial:", { id: this.lastID, ...newTutorial });
      result(null, { id: this.lastID, ...newTutorial });
    });
  }
  // Find a Tutorial by ID
  static findById(id, result) {
    const query = `SELECT * FROM tutorials 
    WHERE id = ?`;

    db.get(query, [id], (err, row) => {
      if (err) {
        console.error("Error finding tutorial:", err.message);
        result(err, null);
        return;
      }

      if (row) {
        console.log("Found tutorial:", row);
        result(null, row);
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  }
  // Get all Tutorials (optionally filter by title)
  static getAll(title, result) {
    let query = `SELECT * FROM tutorials`;
    const values = [];

    if (title) {
      query += ` WHERE title LIKE ?`;
      values.push(`%${title}%`);
    }

    db.all(query, values, (err, rows) => {
      if (err) {
        console.error("Error retrieving tutorials:", err.message);
        result(null, err);
        return;
      }

      console.log("Tutorials:", rows);
      result(null, rows);
    });
  }
  // Get all Published Tutorials
  static getAllPublished(result) {
    const query = `SELECT * FROM tutorials 
    WHERE published = 1`;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error retrieving published tutorials:", err.message);
        result(null, err);
        return;
      }

      console.log("Published tutorials:", rows);
      result(null, rows);
    });
  }
  // Update a Tutorial by ID
  static updateById(id, tutorial, result) {
    const query = `
    UPDATE tutorials
    SET title = ?, description = ?, published = ?
    WHERE id = ?
  `;
    const values = [tutorial.title, tutorial.description, tutorial.published, id];

    db.run(query, values, function (err) {
      if (err) {
        console.error("Error updating tutorial:", err.message);
        result(null, err);
        return;
      }

      if (this.changes === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated tutorial:", { id, ...tutorial });
      result(null, { id, ...tutorial });
    });
  }
  // Delete a Tutorial by ID
  static remove(id, result) {
    const query = `DELETE FROM tutorials 
    WHERE id = ?`;

    db.run(query, [id], function (err) {
      if (err) {
        console.error("Error deleting tutorial:", err.message);
        result(null, err);
        return;
      }

      if (this.changes === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`Deleted tutorial with id: ${id}`);
      result(null, { id });
    });
  }
  // Delete all Tutorials
  static removeAll(result) {
    const query = `DELETE FROM tutorials`;

    db.run(query, function (err) {
      if (err) {
        console.error("Error deleting all tutorials:", err.message);
        result(null, err);
        return;
      }

      console.log(`Deleted ${this.changes} tutorials`);
      result(null, { affectedRows: this.changes });
    });
  }
}








module.exports = Tutorial;
