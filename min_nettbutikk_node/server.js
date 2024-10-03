const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kodelode44',
  database: 'online_store'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/products/:product_id', (req, res) => {
  const { product_id } = req.params; 
  const sql = 'SELECT * FROM products WHERE product_id = ?';
  db.query(sql, [product_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});