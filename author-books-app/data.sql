INSERT INTO authors (name, nationality, birth_year, bio) VALUES
('J.R.R. Tolkien', 'British', 1892, 'Author of The Lord of the Rings and The Hobbit.'),
('Frank Herbert', 'American', 1920, 'Best known for the science fiction novel Dune.'),
('Ursula K. Le Guin', 'American', 1929, 'Pioneer of literary science fiction and fantasy.'),
('George Orwell', 'British', 1903, 'Known for dystopian works exploring political themes.'),
('Octavia Butler', 'American', 1947, 'Award-winning science fiction writer and humanist.');

INSERT INTO books (title, genre, published_year, pages, isbn, author_id) VALUES
('The Hobbit', 'Fantasy', 1937, 310, '978-0547928227', 1),
('The Fellowship of the Ring', 'Fantasy', 1954, 423, '978-0547928210', 1),
('The Two Towers', 'Fantasy', 1954, 352, '978-0547928203', 1),
('Dune', 'Sci-Fi', 1965, 412, '978-0441013593', 2),
('Dune Messiah', 'Sci-Fi', 1969, 226, '978-0441015221', 2),
('The Left Hand of Darkness', 'Sci-Fi', 1969, 286, '978-0441478125', 3),
('The Dispossessed', 'Sci-Fi', 1974, 311, '978-0061054884', 3),
('1984', 'Dystopian', 1949, 328, '978-0451524935', 4),
('Animal Farm', 'Dystopian', 1945, 112, '978-0451526342', 4),
('Kindred', 'Sci-Fi', 1979, 264, '978-0807083697', 5),
('Parable of the Sower', 'Sci-Fi', 1993, 345, '978-0446360807', 5);
