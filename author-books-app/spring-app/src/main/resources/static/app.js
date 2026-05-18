const API = 'http://localhost:8080';

async function loadAuthors() {
    const res = await fetch(API + '/authors');
    const authors = await res.json();
    const list = document.getElementById('authors-list');
    list.innerHTML = '';
    authors.forEach(function(author) {
        const card = document.createElement('div');
        card.className = 'author-card';
        card.innerHTML =
            '<h3>' + author.name + '</h3>' +
            '<p>Nationality: ' + author.nationality + '</p>' +
            '<p>Birth Year: ' + author.birthYear + '</p>' +
            '<p>Bio: ' + author.bio + '</p>' +
            '<button onclick="loadBooks(' + author.id + ', this)">Show Books</button>' +
            '<button class="delete-btn" onclick="deleteAuthor(' + author.id + ')">Delete</button>' +
            '<button class="edit-btn" onclick="editAuthor(' + author.id + ', \'' + author.name + '\', \'' + author.nationality + '\', ' + author.birthYear + ', \'' + author.bio + '\')">Edit</button>' +
            '<div id="books-' + author.id + '"></div>';
        list.appendChild(card);
    });
}

async function addAuthor() {
    const author = {
        name: document.getElementById('name').value,
        nationality: document.getElementById('nationality').value,
        birthYear: document.getElementById('birthYear').value,
        bio: document.getElementById('bio').value
    };
    await fetch(API + '/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author)
    });
    document.getElementById('name').value = '';
    document.getElementById('nationality').value = '';
    document.getElementById('birthYear').value = '';
    document.getElementById('bio').value = '';
    loadAuthors();
}

async function deleteAuthor(id) {
    await fetch(API + '/authors/' + id, { method: 'DELETE' });
    loadAuthors();
}

async function editAuthor(id, name, nationality, birthYear, bio) {
    document.getElementById('name').value = name;
    document.getElementById('nationality').value = nationality;
    document.getElementById('birthYear').value = birthYear;
    document.getElementById('bio').value = bio;
    document.querySelector('#add-author-form h2').textContent = 'Edit Author';
    document.querySelector('#add-author-form button').textContent = 'Update Author';
    document.querySelector('#add-author-form button').onclick = function() {
        updateAuthor(id);
    };
}

async function updateAuthor(id) {
    const author = {
        name: document.getElementById('name').value,
        nationality: document.getElementById('nationality').value,
        birthYear: document.getElementById('birthYear').value,
        bio: document.getElementById('bio').value
    };
    await fetch(API + '/authors/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author)
    });
    document.getElementById('name').value = '';
    document.getElementById('nationality').value = '';
    document.getElementById('birthYear').value = '';
    document.getElementById('bio').value = '';
    document.querySelector('#add-author-form h2').textContent = 'Add New Author';
    document.querySelector('#add-author-form button').textContent = 'Add Author';
    document.querySelector('#add-author-form button').onclick = addAuthor;
    loadAuthors();
}

async function loadBooks(authorId, btn) {
    const container = document.getElementById('books-' + authorId);
    if (container.innerHTML !== '') {
        container.innerHTML = '';
        btn.textContent = 'Show Books';
        return;
    }
    const res = await fetch(API + '/authors/' + authorId + '/books');
    const books = await res.json();
    btn.textContent = 'Hide Books';

    let html = '<div class="add-book-form">' +
        '<input id="book-title-' + authorId + '" placeholder="Title">' +
        '<input id="book-genre-' + authorId + '" placeholder="Genre">' +
        '<input id="book-year-' + authorId + '" placeholder="Year" type="number">' +
        '<input id="book-pages-' + authorId + '" placeholder="Pages" type="number">' +
        '<button onclick="addBook(' + authorId + ')">Add Book</button>' +
        '</div>';

    if (books.length === 0) {
        html += '<p>No books found.</p>';
    } else {
        books.forEach(function(b) {
            html += '<div class="book-card">' +
                '<strong>' + b.title + '</strong> (' + b.publishedYear + ')' +
                '<p>Genre: ' + b.genre + ' | Pages: ' + b.pages + '</p>' +
                '<button class="delete-btn" onclick="deleteBook(' + b.id + ', ' + authorId + ')">Delete Book</button>' +
                '</div>';
        });
    }
    container.innerHTML = html;
}

async function addBook(authorId) {
    const book = {
        title: document.getElementById('book-title-' + authorId).value,
        genre: document.getElementById('book-genre-' + authorId).value,
        publishedYear: document.getElementById('book-year-' + authorId).value,
        pages: document.getElementById('book-pages-' + authorId).value,
        author: { id: authorId }
    };
    await fetch(API + '/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    const btn = document.querySelector('[onclick="loadBooks(' + authorId + ', this)"]');
    btn.textContent = 'Show Books';
    document.getElementById('books-' + authorId).innerHTML = '';
    loadBooks(authorId, btn);
}

async function deleteBook(bookId, authorId) {
    await fetch(API + '/books/' + bookId, { method: 'DELETE' });
    const btn = document.querySelector('[onclick="loadBooks(' + authorId + ', this)"]');
    btn.textContent = 'Show Books';
    document.getElementById('books-' + authorId).innerHTML = '';
    loadBooks(authorId, btn);
}

loadAuthors();