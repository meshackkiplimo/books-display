import express from 'express';
import cors from 'cors';
import pool from './database.js'; // Import the database connection pool


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GET all books with author names
app.get('/books', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.book_id, b.title, a.name AS author, b.price, b.stock
            FROM books b
            JOIN authors a ON b.author_id = a.author_id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new book
app.post('/books', async (req, res) => {
    const { title, author, price, stock } = req.body;

    try {
        // Check if the author exists or insert a new one
        const [authorResult] = await pool.query(
            'SELECT author_id FROM authors WHERE name = ?',
            [author]
        );

        let authorId;
        if (authorResult.length === 0) {
            const [newAuthor] = await pool.query(
                'INSERT INTO authors (name) VALUES (?)',
                [author]
            );
            authorId = newAuthor.insertId;
        } else {
            authorId = authorResult[0].author_id;
        }

        // Insert the new book
        const [newBook] = await pool.query(
            'INSERT INTO books (title, author_id, price, stock) VALUES (?, ?, ?, ?)',
            [title, authorId, price, stock]
        );

        // Fetch the newly inserted book
        const [bookResult] = await pool.query(
            'SELECT * FROM books WHERE book_id = ?',
            [newBook.insertId]
        );

        res.status(201).json(bookResult[0]);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});