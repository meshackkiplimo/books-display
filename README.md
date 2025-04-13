# Bookstore Application

This is a full-stack bookstore application with a Node.js/Express backend and vanilla JavaScript frontend.

## Project Structure

```
bookstore/
│
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── index.css
    └── script.js
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bookstore-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```

3. Create a `.env` file with your MySQL database configuration:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=bookstore
   ```

4. Set up your MySQL database:
   ```sql
   CREATE DATABASE bookstore;
   USE bookstore;

   CREATE TABLE authors (
     author_id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL
   );

   CREATE TABLE books (
     book_id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(200) NOT NULL,
     author_id INT,
     price DECIMAL(10,2) NOT NULL,
     stock INT NOT NULL,
     FOREIGN KEY (author_id) REFERENCES authors(author_id)
   );
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:3000

## Frontend Setup

1. Open the frontend directory in your preferred code editor.

2. Since the frontend uses vanilla JavaScript, no installation is required.

3. Open the `index.html` file in a web browser:
   - You can use Visual Studio Code's Live Server extension
   - Or simply double-click the index.html file to open it in your default browser

The frontend will automatically connect to the backend at http://localhost:3000

## Features

- View all books with their authors, prices, and stock levels
- Add new books with author information
- Real-time updates when adding new books
- Responsive design
- Error handling and loading states

## API Endpoints

- GET `/books` - Retrieve all books with author information
- POST `/books` - Add a new book
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "price": 29.99,
    "stock": 10
  }
  ```

## Troubleshooting

1. If the backend fails to connect:
   - Check if MySQL is running
   - Verify your .env configuration
   - Ensure the database and tables are created

2. If the frontend doesn't display books:
   - Check if the backend server is running
   - Open browser developer tools (F12) to check for errors
   - Verify that CORS is enabled on the backend

## Notes

- The backend uses CORS to allow frontend access
- The frontend uses modern JavaScript features (async/await)
- Ensure your browser is up to date for best compatibility
