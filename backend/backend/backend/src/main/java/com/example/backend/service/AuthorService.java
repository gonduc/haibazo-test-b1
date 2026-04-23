package com.example.backend.service;

import com.example.backend.dto.AuthorResponse;
import com.example.backend.model.Author;
import com.example.backend.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;

    // Lấy danh sách có phân trang
    public Page<Author> getAuthors(Pageable pageable) {
        return authorRepository.findAll(pageable);
    }

    // Thêm mới tác giả
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }
}