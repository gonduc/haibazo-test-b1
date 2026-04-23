package com.example.backend.dto;

import lombok.Data;

@Data
public class AuthorResponse {
    private Long id;
    private String name;
    private int booksCount;
}
