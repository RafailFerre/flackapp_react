const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Подключение к базе данных (путь к файлу ../db/flackapp.db относительно src)
const db = new sqlite3.Database(path.join(__dirname, '../db/flackapp.db'), (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
    process.exit(1); // Завершаем процесс при ошибке
  }
  console.log('Успешно подключено к базе данных SQLite');
});

// Создание таблицы services
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL,
      contact TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Ошибка при создании таблицы:', err.message);
    } else {
      console.log('Таблица services готова');
    }
  });
});

// Экспорт объекта базы данных
module.exports = db;