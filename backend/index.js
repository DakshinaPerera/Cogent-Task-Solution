const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database (file will be created if it doesn't exist)
const dbPath = path.resolve(__dirname, 'registrations.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database');
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    job_title TEXT,
    company TEXT,
    mobile_number TEXT,
    email TEXT NOT NULL,
    company_website TEXT,
    consent INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Handle POST /api/register
app.post('/api/register', (req, res) => {
  const {
    first_name,
    last_name,
    job_title,
    company,
    mobile_number,
    email,
    company_website,
    consent
  } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }

  const sql = `
    INSERT INTO registrations (
      first_name, last_name, job_title, company, mobile_number, email, company_website, consent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [
      first_name,
      last_name,
      job_title || null,
      company || null,
      mobile_number || null,
      email,
      company_website || null,
      consent ? 1 : 0
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
