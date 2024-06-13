import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

// Route to get all form data
app.get('/form_data', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM form_data");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to submit form data
app.post('/api/form_data', async (req, res) => {
  const {
    firstName, lastName, email, mobileNumber, birth, password,
    selectedProduct, selectedGender, feedback, selectedCountry
  } = req.body;
  console.log("Received form data:", req.body);
  try {
    const [result] = await pool.query(
      `INSERT INTO form_data 
      (firstName, lastName, email, mobileNumber, birth, password, selectedProduct, selectedGender, feedback, selectedCountry)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName, lastName, email, mobileNumber, birth, password,
        selectedProduct, selectedGender, feedback, selectedCountry.value
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Default route
app.get('/', (req, res) => {
  return res.json("From backend");
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
