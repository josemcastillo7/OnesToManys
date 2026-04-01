DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    nationality   TEXT,
    birth_year    INTEGER,
    bio           TEXT
);

CREATE TABLE books (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT    NOT NULL,
    genre           TEXT,
    published_year  INTEGER,
    pages           INTEGER,
    isbn            TEXT    UNIQUE,
    cover_image_url TEXT,
    author_id       INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);
