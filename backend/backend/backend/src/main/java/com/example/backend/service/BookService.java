package com.example.backend.service;

import com.example.backend.model.Book;
import com.example.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Page<Book> getBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
}