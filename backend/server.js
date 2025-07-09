const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error("Database open error", err);
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`
);

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hashed],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }
      return res.json({ id: this.lastID, username });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err || !row) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = bcrypt.compareSync(password, row.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    return res.json({ id: row.id, username: row.username });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));