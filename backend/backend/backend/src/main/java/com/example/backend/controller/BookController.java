package com.example.backend.controller;

import com.example.backend.model.Book;
import com.example.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<Page<Book>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Page<Book> books = bookService.getBooks(PageRequest.of(page, size));
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody Book book) {
        try {
            Book savedBook = bookService.saveBook(book); 
            return ResponseEntity.ok(savedBook);
        } catch (DataIntegrityViolationException e) {
            // Bắt lỗi trùng tên sách
            return ResponseEntity.badRequest().body("Tên sách đã tồn tại. Vui lòng chọn tên khác!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra khi lưu vào hệ thống!");
        }
    }
}