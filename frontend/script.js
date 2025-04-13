// Function to show error messages
function showError(message) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = `<div class="error">${message}</div>`;
}

// Function to fetch and display books
async function fetchBooks() {
    const booksContainer = document.getElementById('books-container');
    if (!booksContainer) {
        console.error('Books container not found!');
        return;
    }

    try {
        booksContainer.innerHTML = '<div class="loading">Loading books...</div>';
        const response = await fetch('http://localhost:3000/books');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const books = await response.json();
        console.log('Fetched books:', books); // Debug log
        
        if (!Array.isArray(books)) {
            console.error('Expected books to be an array, got:', typeof books);
            booksContainer.innerHTML = '<div class="error">Invalid data format received</div>';
            return;
        }

        if (books.length === 0) {
            booksContainer.innerHTML = '<div class="no-books">No books available</div>';
            return;
        }

        booksContainer.innerHTML = ''; // Clear existing content

        books.forEach(book => {
            console.log('Processing book:', book); // Debug log
            if (!book) return;
            
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <h3>${book.title || 'No Title'}</h3>
                <p>Author: ${book.name || 'Unknown Author'}</p>
                <p>Price: $${typeof book.price === 'number' ? book.price.toFixed(2) : '0.00'}</p>
                <p>Stock: ${book.stock || 0}</p>
            `;
            booksContainer.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        showError('Failed to fetch books. Please try again later.');
    }
}

// Function to handle form submission
function initializeFormHandler() {
    const form = document.getElementById('book-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const newBook = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value)
            };

            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBook)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Clear the form
                e.target.reset();
                
                // Refresh the book list
                fetchBooks();
            } catch (error) {
                console.error('Error adding book:', error);
                showError('Failed to add book. Please try again.');
            }
        });
    }
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handler
    initializeFormHandler();

    // Add click event listener to fetch books button
    const fetchButton = document.getElementById('fetch-books');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchBooks);
    }

    // Initial fetch of books
    fetchBooks();
});