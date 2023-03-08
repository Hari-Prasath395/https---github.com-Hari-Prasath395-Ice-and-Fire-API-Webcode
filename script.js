// Fetch books from API
async function fetchBooks() {
    try {
      const response = await fetch('https://www.anapioficeandfire.com/api/books');
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
  
    books.forEach(book => {
      const bookName = book.name.length > 50 ? book.name.substring(0, 50) + '...' : book.name;
      const authorName = book.authors.slice(0, 5).join(', ') + (book.authors.length > 5 ? ', ...' : '');
      const releaseDate = new Date(book.released).toISOString().slice(0, 10);
      bookList.innerHTML += `
        <tr>
          <td>${bookName}</td>
          <td>${book.isbn}</td>
          <td>${book.numberOfPages}</td>
          <td>${authorName}</td>
          <td>${book.publisher}</td>
          <td>${releaseDate}</td>
        </tr>
      `;
    });
  }
  
  function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const bookRows = document.querySelectorAll('#bookList tr');
  
    bookRows.forEach(row => {
      const bookName = row.querySelector('td:first-child').textContent.toLowerCase();
  
      if (bookName.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  fetchBooks();
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', searchBooks);
  