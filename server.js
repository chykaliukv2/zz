const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Підключення CORS
app.use(cors());
app.use(bodyParser.json()); // для обробки JSON

// Масив для зберігання відгуків
let reviews = [];

// Отримати всі відгуки
app.get('/reviews', (req, res) => {
  res.json(reviews);
});

// Додати новий відгук
app.post('/reviews', (req, res) => {
  const { name, text } = req.body;
  reviews.push({ name, text });
  res.status(201).json({ message: 'Відгук додано!' });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
