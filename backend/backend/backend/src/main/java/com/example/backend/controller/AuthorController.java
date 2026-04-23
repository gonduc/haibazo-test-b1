package com.example.backend.controller;

import com.example.backend.model.Author;
import com.example.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping
    public ResponseEntity<Page<Author>> getAllAuthors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Page<Author> authors = authorService.getAuthors(PageRequest.of(page, size));
        return ResponseEntity.ok(authors);
    }

    @PostMapping
    public ResponseEntity<?> createAuthor(@RequestBody Author author) {
        try {
            
            Author savedAuthor = authorService.saveAuthor(author); 
            return ResponseEntity.ok(savedAuthor);
        } catch (DataIntegrityViolationException e) {
            
            return ResponseEntity.badRequest().body("Tên tác giả đã tồn tại. Vui lòng chọn tên khác!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra khi lưu vào hệ thống!");
        }
    }
} 