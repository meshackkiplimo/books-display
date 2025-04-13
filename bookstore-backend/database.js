import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
pool.getConnection()
    .then((connection) => {
        console.log(`Connected to the MySQL database: ${process.env.DB_NAME}`);
        connection.release(); // Release the connection back to the pool
    })
    .catch((error) => {
        console.error('Error connecting to the MySQL database:', error.message);
        process.exit(1); // Exit the process if the connection fails
    });

export default pool;