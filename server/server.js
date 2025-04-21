import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = await open({
  filename: './database.db',
  driver: sqlite3.Database
});

// таблицы БД (новости, обратная связь)
await db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    address TEXT,
    telephone TEXT NOT NULL,
    email TEXT NOT NULL,
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/api/news', async (req, res) => {
  try {
    const news = await db.all(`SELECT * FROM news ORDER BY created_at DESC`);
    const newsWithImages = news.map(item => ({
      ...item,
      image: `/images/${item.image}`
    }));
    res.json(newsWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const result = await db.run(
      `INSERT INTO news (title, description, image) VALUES (?, ?, ?)`,
      [title, description, image]
    );
    res.json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await db.all(`SELECT * FROM feedback ORDER BY created_at DESC`);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { fullname, address, telephone, email, feedback } = req.body;
    const result = await db.run(
      `INSERT INTO feedback (fullname, address, telephone, email, feedback) VALUES (?, ?, ?, ?, ?)`,
      [fullname, address, telephone, email, feedback]
    );
    res.json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});