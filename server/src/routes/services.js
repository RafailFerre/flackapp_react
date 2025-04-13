const express = require('express');
const db = require('../db'); // Подключаем базу данных

const router = express.Router();

// Маршрут для получения всех услуг
router.get('/', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) {
      console.error('Ошибка при получении услуг:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }
    res.json(rows);
  });
});

// Маршрут для создания новой услуги
router.post('/', (req, res) => {
  const { title, description, price, contact, category } = req.body;

  if (!title) {
    res.status(400).json({ error: 'Название услуги обязательно' });
    return;
  }

  const stmt = db.prepare(`
    INSERT INTO services (title, description, price, contact, category)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(title, description, price, contact, category, function (err) {
    if (err) {
      console.error('Ошибка при создании услуги:', err.message);
      res.status(500).json({ error: 'Ошибка при создании услуги' });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Услуга создана' });
  });
  stmt.finalize();
});

module.exports = router;