const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql2');

const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'contactdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, subject, message, copy } = req.body;
  const copyValue = copy ? 1 : 0;

  const query = 'INSERT INTO contact_form (name, email, subject, message, copy) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, subject, message, copyValue], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).send('Database error');
    }
    res.send('Form submitted successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
