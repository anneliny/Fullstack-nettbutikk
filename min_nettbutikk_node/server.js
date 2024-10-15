const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bycryptjs = require('bcryptjs');

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
    console.error('Feil ved tilkobling til MySQL:', err.message);
    return;
  }
  console.log('Koblet til MySQL');
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
      return res.status(404).json({ message: 'Produktet ble ikke funnet' });
    }
    res.json(result[0]);
  });
});

const userDB = [];

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  const saltRounds = 10;
  try {
    const hashedPassword = await bycryptjs.hash(password, saltRounds);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send('Database error');
      }
      res.status(201).send('Bruker registrert');
    });
  } catch (error) {
    console.error('Error hashing av passord:', error);
    res.status(500).send('Intern Server Error');
  }
});

app.post('/min-side', async (req, res) => {
  const {email, password} = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('Bruker ikke funnet');
    }

    const user = results[0];
    const isMatch = await bycryptjs.compare(password, user.password);
    if (isMatch) {
      res.send('Logget inn');
    } else {
      res.status(400).send('Feil passord');
    }
  });
 });

app.listen(port, () => {
  console.log(`Server kjører på port: ${port}`);
});