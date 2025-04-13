const sqlite3 = require('sqlite3').verbose();

// Подключение к SQLite (файл БД создастся автоматически)
const db = new sqlite3.Database('./db/flackapp.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase(); // Создаём таблицы при первом запуске
  }
});

// Инициализация таблиц
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10, 2),
      category TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating tables:', err.message);
    else console.log('Tables initialized.');
  });
}

// Экспортируем объект для работы с БД
module.exports = db;