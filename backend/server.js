const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


 const db = mysql.createConnection({
  host: '127.0.0.1',         // Sửa lại đúng với MySQL Workbench
  user: 'root',
  password: "123456",        // Đảm bảo đúng mật khẩu đang lưu trong Vault
  database: 'garden'         // Đảm bảo đã tạo schema này trong MySQL
});




db.connect(err => {
  if (err) throw err;
  console.log(`Da ket noi MySQL`);
});

let plants = [
  { id: 1, name: 'Cây xanh', type: 'Rau', planted_at: '2025-01-01' },
  { id: 2, name: 'Cây Cà Chua', type: 'Cây trồng', planted_at: '2025-02-15' },
];

// Get all plants
app.get('/plants', (req, res) => {
  res.json(plants);
});

// Add new plant
app.post('/plants', (req, res) => {
  const { name, type, planted_at } = req.body;
  db.query(
    'INSERT INTO plants (name, type, planted_at) VALUES (?, ?, ?)',
    [name, type, planted_at],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, type, planted_at });
    }
  );
});


// Update plant
app.put('/plants/:id', (req, res) => {
  const { name, type, planted_at } = req.body;
  db.query(
    'UPDATE plants SET name=?, type=?, planted_at=? WHERE id=?',
    [name, type, planted_at, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, name, type, planted_at });
    }
  );
});

// Delete plant
app.delete('/plants/:id', (req, res) => {
  db.query('DELETE FROM plants WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).end();
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
