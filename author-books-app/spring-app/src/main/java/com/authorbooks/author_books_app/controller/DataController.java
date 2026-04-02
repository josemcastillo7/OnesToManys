package com.authorbooks.author_books_app.controller;

import com.authorbooks.author_books_app.model.Author;
import com.authorbooks.author_books_app.model.Book;
import com.authorbooks.author_books_app.service.AuthorService;
import com.authorbooks.author_books_app.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private AuthorService authorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/export")
    public Map<String, Object> exportData() throws Exception {
        List<Author> authors = authorService.findAll();
        List<Book> books = bookService.findAll();

        Map<String, Object> data = new HashMap<>();
        data.put("authors", authors);
        data.put("books", books);

        objectMapper.writerWithDefaultPrettyPrinter()
            .writeValue(new File("data-export.json"), data);

        return data;
    }
}
