const express = require('express');
const cors = require('cors');
const servicesRouter = require('./routes/services');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение маршрутов
app.use('/api/services', servicesRouter);

// Тестовый маршрут
app.get('/api', (req, res) => {
  res.json({ message: 'Добро пожаловать в API Flackapp!' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

// Обработка завершения работы
process.on('SIGINT', () => {
  console.log('Завершение работы сервера...');
  const db = require('./db');
  db.close((err) => {
    if (err) {
      console.error('Ошибка при закрытии базы данных:', err.message);
    } else {
      console.log('Соединение с базой данных закрыто');
    }
    process.exit(0);
  });
});