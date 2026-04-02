package com.authorbooks.author_books_app.controller;

import com.authorbooks.author_books_app.model.Author;
import com.authorbooks.author_books_app.model.Book;
import com.authorbooks.author_books_app.service.AuthorService;
import com.authorbooks.author_books_app.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Author> getAllAuthors() { return authorService.findAll(); }

    @GetMapping("/{id}")
    public Author getAuthorById(@PathVariable Long id) {
        return authorService.findById(id).orElse(null);
    }

    @GetMapping("/{id}/books")
    public List<Book> getBooksByAuthor(@PathVariable Long id) {
        Author author = authorService.findById(id).orElse(null);
        if (author == null) return null;
        return author.getBooks();
    }

    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        return authorService.save(author);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable Long id, @RequestBody Author author) {
        author.setId(id);
        return authorService.save(author);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) { authorService.deleteById(id); }
}
