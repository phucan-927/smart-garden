const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let plants = [
   { id: 1, name: 'Cây xanh', type: 'Rau', planted_at: '2025-01-01' },
   { id: 2, name: 'Cây Cà Chua', type: 'Cây trồng', planted_at: '2025-02-15' },
  ];


app.post('/plants', (req, res) => {
  const newPlant = { í: Date.now(), ...req.body };
  plants.push(newPlant);
  res.status(201).json(newPlant);
 });



app.put('/plants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = plants.findIndex(p =>  p.id === id);
  if (index !== -1) {
    plants[index] = { ...plants[index], ...req.body };
    res.json(plants[index]);
   } else {
      res.status(404).json({ error: "Không tìm thấy cây" });
   }
 });



app.delete('/plants/:id', (req, res) => {
   const id = parseInt(req.params.id);
   plants = plants.filter(p => p.id !== id);
   res.status(204).end();
 });

app.listen(PORT, () => {
 console.log(`Backend chạy tại http://localhost:${PORT}`);
